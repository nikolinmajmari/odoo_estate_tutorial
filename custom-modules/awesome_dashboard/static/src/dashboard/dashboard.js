/** @odoo-module **/


import { Component, onWillStart, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import {Layout} from "@web/search/layout";
import { DashboardItem } from "./DashboardItem/dashboard-item";
import { PieChart } from "./PieChart/pieChart";


class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";

    static components = {
        Layout,DashboardItem,PieChart
    }

    setup(){
        /// services 
        this.action = useService("action");
        this.service = useService("awesome_dashboard.statistics");
        this.state = useState({result:{}})

        onWillStart( async()=>{
            const result = await this.service.loadStatistics();
            this.state.result = result; 
        })
    }

    get data(){
        return this.state.result;
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

registry.category("lazy_components").add("AwesomeDashboard", AwesomeDashboard);
