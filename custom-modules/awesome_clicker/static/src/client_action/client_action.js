/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useClicker } from "../useClicker";
import { ClickValue } from "../click_value/click_value";
import {Notebook} from "@web/core/notebook/notebook";

export class ClientAction extends Component {
    static template = "awesome_clicker.client";
    static components = {
        ClickValue,Notebook
    };
    static props = {
    };

    /// geters 
    get bots(){
        return this.clicker.bots;
    }


    /// setup 
    setup() {
        this.clicker = useClicker();
    }


    /// handlers
    increment(e){
        this.clicker.increment(10)
    }

    
    buyMultipler(){
        if(this.canBuyMultipler){
            this.clicker.increaseMultipler();
        }
    }
}


registry.category('actions').add('awesome_clicker.client_action',ClientAction);