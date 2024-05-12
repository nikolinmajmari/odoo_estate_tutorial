/** @odoo-module **/
import { Component, onMounted, useExternalListener, useRef, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";


export class ClickerSytrayItem extends Component {
    static template = "awesome_clicker.systrai_item";
    static components = {};
    static props = {};

    setup() {

        /// hooks 
        this.clickerRef = useRef('clicker-btn-ref')
        const {state,increment,incrementBy10} = useService('awesome_clicker.clicker_service');
        this.clicker = useState(state);
        this._increment = increment;
        this._incrementBy10 = incrementBy10;
        this.action = useService('action');
        useExternalListener(document.body,'click',this.increment.bind(this),{capture:true})
    }

    increment(e){
        if(e.target.closest('button')===this.clickerRef.el || e.target === this.clickerRef.el){
            return ; /// do not increment if event is fired by increment button or any decendant of it
        }
        this._increment();
    }

    onCounterClick(e){
        e.stopPropagation();
        this._incrementBy10();
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