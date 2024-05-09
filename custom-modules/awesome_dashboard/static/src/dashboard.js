/** @odoo-module **/


import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import {Layout} from "@web/search/layout";
import { DashboardItem } from "./DashboardItem/dashboard-item";

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";

    static components = {
        Layout,DashboardItem
    }

    setup(){
        this.action = useService("action")
        window.action = this.action;
    }

    openCustomers(){
        this.action.doAction("base.action_partner_form")
    }
    openLeeds(){
        this.action.doAction({
            res_model:"crm.lead",
            name: "Leeds",
            type: "ir.actions.act_window",
            views: [[false,"list"],[false,"form"]]
        })
    }
}

registry.category("actions").add("awesome_dashboard.dashboard", AwesomeDashboard);
