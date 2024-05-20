/** @odoo-module **/

import { KeepLast } from "@web/core/utils/concurrency";
import { useService } from "@web/core/utils/hooks";
import { Reactive } from "@web/core/utils/reactive";
import { fuzzyLookup } from "@web/core/utils/search";


export class CustomerListModel extends Reactive{

    constructor(
        orm 
    ){
        super();
        this.orm = orm;
        this.keepLast = new KeepLast();
        this.displayActiveOnly = false;
        this.records = {};
        this.total = 0;
        this.pageKeys = [];
        this.keys = [];
        this.length = 0;
        this.pager = {
            offset: 0,
            limit: 10,
        };
        this.selected = null;
        this.query = "";
    }

    get domains(){
        return this.displayActiveOnly ? [["opportunity_ids","!=",false]]:[]
    }

    get allKeys(){
        return Object.keys(this.records);
    }

    async fetchCustomers(page){
        this.updatePage(page||{});
        const {records,length} = await this.keepLast.add(
            this.orm.webSearchRead('res.partner',
               this.domains,
               {
                    ...this.pager,
                    specification:{
                        name:{},
                }
            })
        );
        this.total = length;
        this.length = this.total;
        for(const record of records){
            this.records[record.id] = record;
        }
        this.refresh();
    }

    async toggleActiveUsers(active){
        this.displayActiveOnly = active;
        await this.fetchCustomers();
    }


    updatePage(pager){
        Object.assign(this.pager,pager);
    }

    refresh(){
        this.pageKeys = this.allKeys.filter(
            (_,index)=>
                index>=this.pager.offset 
                && index <= (this.pager.limit + this.pager.offset)
        );
        console.log('page keys',this.pageKeys,this.allKeys);
        this._search();
    }

    async search(query){
        this.query = query;    
        this._search();
    }

    async _search(){
        let keys = this.pageKeys;
        console.log('searching',this.pageKeys,this.keys);
        if(this.query){
            keys = fuzzyLookup(this.query,keys,(key)=>this.records[key].name);
            console.log('fuzzy lookup on ',this.pageKeys);
        }
        this.keys= keys;
    }


}