/** @odoo-module **/
import { Component, onMounted, useExternalListener, useRef, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { useClicker } from "../useClicker";
import { humanNumber } from "@web/core/utils/numbers";
import { ClickValue } from "../click_value/click_value";


export class ClickerSytrayItem extends Component {
    static template = "awesome_clicker.systrai_item";
    static components = {
        ClickValue
    };
    static props = {
        
    };

    static incrementSelector = '[data-clicker-increment="true"]';

    setup() {

        /// hooks 
        this.clickerRef = useRef('clicker-btn-ref')
        this.clicker = useClicker();
        this.action = useService('action');
        useExternalListener(document.body,'click',this.increment.bind(this),{capture:true})
    }

    get clickerValue(){
        return humanNumber(this.clicker.counter)
    }

    increment(e){
        if(e.target.closest(ClickerSytrayItem.incrementSelector)!==null 
        || e.target.matches(ClickerSytrayItem.incrementSelector)){
            return ; /// do not increment if event is fired by increment button or any decendant of it
        }
        this.clicker.increment(1);
    }

    onCounterClick(e){
        e.stopPropagation();
        this.clicker.increment(10)
    }


    onOpenClick(){
        this.action.doAction({
            type: "ir.actions.client",
            tag: "awesome_clicker.client_action",
            target: "new",
            name: "Clicker"
        })
    }
}


registry.category('systray').add('clicker.item',{
    Component: ClickerSytrayItem
})