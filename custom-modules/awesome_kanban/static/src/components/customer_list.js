/** @odoo-module **/

import { Component } from "@odoo/owl";

export class CustomerList extends Component {
    static template = "awesome_kanban.customer_list";
    static components = {};
    static props = {
        selectCustomer:{
            type: Object    
        }
    };

    setup() {

    }
}
