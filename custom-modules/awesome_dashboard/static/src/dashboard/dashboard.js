/** @odoo-module **/

import { Component, onWillStart, toRaw, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import {Layout} from "@web/search/layout";
import { DashboardItem } from "./DashboardItem/dashboard-item";
import { PieChart } from "./PieChart/pieChart";

import { NumberCard } from "./NumberCard/numberCard";
import { Modal } from "./modal/Modal";
import { ConfigModal } from "./config/ConfigModal";

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";

    static components = {
        Layout,DashboardItem,PieChart,NumberCard,ConfigModal
    }

    showModal(){
        this.modal.show = true;
    }

    closeModal(){
        this.modal.show = false;
    }

    setup(){
        /// services 
        this.items = registry.category('data').get('awesome_dashboard_items');
        this.action = useService("action");
        this.service = useService("awesome_dashboard.statistics");
        this.state = useState({result:{}});
        this.modal = useState({show:false});
        this.config = useState({
            showItems: toRaw(this.loadConfig())
        })
        console.log(this.itemShowInfo,this.config,this.loadConfig);

        onWillStart( async()=>{
            const result = await this.service.loadStatistics();
            this.state.result = result; 
        })
    }

    updateConfig(itemIds){
        this.config.showItems = itemIds;
        localStorage.setItem('dashboard-config',JSON.stringify(itemIds));
    }

    get data(){
        return this.state.result;
    }

    get itemInfo(){
        return this.items.map(({id})=>{
            return {id,show: this.config.showItems.includes(id)}
        })
    }


    loadConfig(){
        const item = localStorage.getItem('dashboard-config');
        if(item){
            return JSON.parse(item)
        }
        return this.items.map(({id})=>id);
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
