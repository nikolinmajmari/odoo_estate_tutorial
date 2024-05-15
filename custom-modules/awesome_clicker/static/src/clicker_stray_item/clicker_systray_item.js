/** @odoo-module **/
import { Component, onMounted, useExternalListener, useRef, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { useClicker } from "../useClicker";
import { humanNumber } from "@web/core/utils/numbers";
import { ClickValue } from "../click_value/click_value";
import { doClickerAction } from "../util";
import { Dropdown } from "@web/core/dropdown/dropdown";
import { DropdownItem } from "@web/core/dropdown/dropdown_item";


export class ClickerSytrayItem extends Component {
    static template = "awesome_clicker.systrai_item";
    static components = {
        ClickValue,Dropdown,DropdownItem
    };
    static props = {
        
    };

    static incrementSelector = '[data-clicker-increment="true"]';

    setup() {

        /// hooks 
        this.clickerRef = useRef('clicker-btn-ref')
        this.clicker = useClicker();
        this.action = useService('action');
        useExternalListener(document.body,'click',this.increment.bind(this),{capture:true});
    }

    get firstCommand(){
        if(this.commands && this.commands.length > 0){
            return this.commands[0];
        }
        return false;
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
        doClickerAction(this.action);
    }
}


registry.category('systray').add('clicker.item',{
    Component: ClickerSytrayItem
})