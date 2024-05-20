/** @odoo-module **/

import {KanbanController} from "@web/views/kanban/kanban_controller";
import { CustomerList } from "../components/customer_list";
import { useState } from "@odoo/owl";


const isAwesomeKanbanFilter = Symbol('isAwesomeKanbanFilter');

export class AwesomeKanbanController extends KanbanController{
    static template = "awesome_kanban.kanban_controller";
    static components = {
        ...KanbanController.components,
        CustomerList
    }
    setup(){
        super.setup();
        window.searchModel = this.env.searchModel;
    }


    clearAwesomeKanbanFilters(){
        console.log(this.env,'env',this.env.searchModel);
        const customerFilters = this.env.searchModel.getSearchItems((item)=>item[isAwesomeKanbanFilter]);
        for(const filter of customerFilters){
            if(filter.isActive){
                this.env.searchModel.toggleSearchItem(filter.id);
            }
        }
    }

    selectCustomer(partner){
        this.clearAwesomeKanbanFilters();   
        this.env.searchModel.createNewFilters([{
            description: partner.name,
            domain: [["partner_id", "=", partner.id]],
            [isAwesomeKanbanFilter]: true, // this is a custom key to retrieve our filters later
        }]);
    }
}