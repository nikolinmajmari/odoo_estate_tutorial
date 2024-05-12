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
import { _t,translatedTerms } from "@web/core/l10n/translation";
import { Dialog } from "@web/core/dialog/dialog";
import { CheckBox } from "@web/core/checkbox/checkbox";

class ConfigurationDialog extends Component {
    static template = "awesome_dashboard.ConfigurationDialog";
    static components = {Dialog,CheckBox};
    static props = {
        updateConfig:{type:Function},
        items:{type:Array},
        enabledItems:{type: Array},
    };

    setup() {
        this.state = useState({
            items:[]
        });
        onWillStart(()=>{
            const items = this.props.items.map((item)=>({
                ...item,
                enabled: this.props.enabledItems.includes(item.id)
            }));
            this.state.items = items;
        })
    }

    done(){
        console.log("saving", this.state.items
        .filter((item)=>item.enabled)
        .map(i=>i.id))
        this.props.close();
        this.props.updateConfig(
            this.state.items
            .filter((item)=>item.enabled)
            .map(i=>i.id)
        )
    }

    onChange(checked,item){
        console.log("odoo checkbox component on change",checked,item);
        item.enabled = checked;
    }
}


class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";

    static components = {
        Layout,DashboardItem,PieChart,NumberCard,ConfigurationDialog
    }


    setup(){
        /// services 
        this.items = registry.category('data').get('awesome_dashboard_items');
        this.action = useService("action");
        this.dialog = useService("dialog");
        
        /// states 
        this.statistics = useState(useService("awesome_dashboard.statistics"));
        // this.modal = useState({show:false});
        this.display = {
            controlPanel: {},
        };

        this.config = useState({
            enabledItems: toRaw(this.loadConfig())
        })
    }

    /// modal config
    openConfigurationDialog(){
        // this.modal.show = true;
        this.dialog.add(ConfigurationDialog,{
            items: this.items,
            enabledItems: this.config.enabledItems,
            updateConfig: this.updateConfig.bind(this) 
        })
    }

    updateConfig(itemIds){
        this.config.enabledItems = itemIds;
        localStorage.setItem('dashboard-config',JSON.stringify(itemIds));
    }

    loadConfig(){
        const item = localStorage.getItem('dashboard-config');
        if(item){
            return JSON.parse(item)
        }
        return this.items.map(({id})=>id); /// by default all are enabled
    }

    /// actions 
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

    // closeModal(){
    //     this.modal.show = false;
    // }

    // get itemInfo(){
    //     return this.items.map(({id})=>{
    //         return {id,show: this.config.showItems.includes(id)}
    //     })
    // }
}


registry.category("lazy_components").add("AwesomeDashboard", AwesomeDashboard);
