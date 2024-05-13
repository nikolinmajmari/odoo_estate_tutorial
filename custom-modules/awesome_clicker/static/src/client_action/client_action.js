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
    get canBuyClickBots(){
        return this.clicker.canBuyClickBots();
    }

    get canBuyBigBots(){
        return this.clicker.canBuyBigBots();
    }

    get canBuyMultiplyFactor(){
        return this.clicker.canIncreaseMultiplyFactor();
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
        if(this.canBuyClickBots){
            this.clicker.buyClickBot();
        }
    }

    buyBigBot(e){
        if(this.canBuyBigBots){
            this.clicker.buyBigBot();
        }
    }

    buyMultiplyFactor(e){
        if(this.canBuyMultiplyFactor){
            this.clicker.increaseMultiplyFactor();
        }
    }
}


registry.category('actions').add('awesome_clicker.client_action',ClientAction);