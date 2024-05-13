/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useClicker } from "../useClicker";
import { ClickValue } from "../click_value/click_value";

export class ClientAction extends Component {
    static template = "awesome_clicker.client";
    static components = {
        ClickValue
    };
    static props = {
    };

    /// geters 
    get canBuyBots(){
        return this.clicker.canBuyBots;
    }


    /// setup 
    setup() {
        this.clicker = useClicker();
    }


    /// handlers
    increment(e){
        this.clicker.increment(10)
    }

    buyClickBot(e){
        this.clicker.buyClickBot();
    }
}


registry.category('actions').add('awesome_clicker.client_action',ClientAction);