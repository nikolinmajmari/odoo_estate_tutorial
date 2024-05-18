/** @odoo-module **/

import { KeepLast } from "@web/core/utils/concurrency";
import { Reactive } from "@web/core/utils/reactive";
import {url} from "@web/core/utils/urls";


export class GalleryModel extends Reactive{
    constructor(orm,resModel,archInfo){
        super();
        /// services 
        this.orm = orm;

        /// config 
        this.resModel = resModel;
        const {imageField,tooltipField,limit,additionalFields} = archInfo;
        this.imageField = imageField;
        this.tooltipField = tooltipField;
        this.additionalFields = additionalFields;
        this.loadKeepLast = new KeepLast();

        /// state 
        this.records = [];
        this.offset = 0;
        this.limit = limit??20;
        this.total = 0;
    }

    getUrl(record){
        const {id,write_date} = record;
        const uri =  url("/web/image",{
            model: this.resModel,
            id: id,
            field: this.imageField,
            write_date
        });
        return uri;
    }

    get specification(){
        const spec = {
            [this.imageField]:{},
            write_date:{}
        };
        for(const field of this.additionalFields){
            if(field){
                spec[field] = {};   
            }
        }
        return spec;
    }

    /**
     * 
     * @param {string} domain 
     * @param {{limit:number,offset:number}} args 
     */
    async load(domain,args={}){
        const pageArgs = {
            offset: this.offset,
            limit:this.limit,
            ...args,
        }
        const {records,length} = await this.loadKeepLast.add(
            this.orm.webSearchRead(this.resModel,
                domain,
                {
                ...pageArgs,
                specification : this.specification,
                context:{
                    bin_size: true
                }
            })
        );
        this.records = records.map((record)=>({
                url: this.getUrl(record),
                ...record
            })
        );
        this.offset = pageArgs.offset;
        this.limit = pageArgs.limit;
        this.total = length;
    }


    async saveImage(partner,image){
        const [update] = await this.orm.webSave(
            this.resModel,
            [partner.id],
            {
                [this.imageField]:image,
            },
            {
                specification : this.specification,
            }
        );
        // const index = this.records.findIndex(p=>p.id==partner.id);
        // if(index!==-1){
        //     this.records[index].write_date = update.write_date;
        // }
        Object.assign(partner,update);
    }
}