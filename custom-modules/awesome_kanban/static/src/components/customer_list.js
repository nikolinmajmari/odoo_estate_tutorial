/** @odoo-module **/

import { Component, onWillStart, useRef, useState } from "@odoo/owl";
import { CheckBox } from "@web/core/checkbox/checkbox";
import { KeepLast } from "@web/core/utils/concurrency";
import { useService } from "@web/core/utils/hooks";
import { fuzzyLookup } from "@web/core/utils/search";
import { serialSearch } from "../util";
import { CustomerListModel } from "./customer_list_model";
import { usePager } from "@web/search/pager_hook";
import { Pager } from "@web/core/pager/pager";
import { WarningDialog } from "@web/core/errors/error_dialogs";

export class CustomerList extends Component {
    static template = "awesome_kanban.customer_list";
    static components = {
        CheckBox,Pager
    };
    static props = {
        selectCustomer:{
            type: Function
        }
    };

    setup() {
        this.searchRef = useRef('search-ref');
        const orm = useService('orm');
        this.model = useState(
            new CustomerListModel(orm)
        );
        onWillStart(async ()=>{
            await this.model.fetchCustomers();
        });
        window.model = this.model;
        console.log(this.model.pager);
    }

    onPagerUpdate(page){
        this.model.fetchCustomers(page);
    }

    get displayedCustomers(){
        return this.model.keys.map(
            (key)=>this.model.records[key]
        );
    }


    toggleActiveCustomersList(checked){
        this.model.toggleActiveUsers(checked);    
    }

    select(partner){
        this.model.selected = partner.id;
        this.props.selectCustomer(partner);
    }

    onKeyDown(e) {
        this.searchTimeout =  serialSearch(
            this.searchTimeout,
            ()=>this.model.search(e.target.value),
            250
        );
    }
}
