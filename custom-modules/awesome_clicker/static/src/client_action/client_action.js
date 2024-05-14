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
    get bots(){
        return this.clicker.bots;
    }

    getBot(id){
        console.log(id,this.clicker.bots[id]);
        return this.clicker.bots[id];
    }

    get canBuyMultipler(){
        return this.clicker.canBuyMultipler();
    }


    /// setup 
    setup() {
        this.clicker = useClicker();
    }


    /// handlers
    increment(e){
        this.clicker.increment(10)
    }

    buyBot(type){
       return this.clicker.buyBot(type)
    }

    canBuyBot(type){
        return this.clicker.canBuyBots(type)
    }

    // buyClickBot(){
    //     if(this.canBuyClickBots){
    //         this.clicker.buyClickBot();
    //     }
    // }

    // buyBigBot(){
    //     if(this.canBuyBigBots){
    //         this.clicker.buyBigBot();
    //     }
    // }

    buyMultipler(){
        if(this.canBuyMultipler){
            this.clicker.increaseMultipler();
        }
    }
}


registry.category('actions').add('awesome_clicker.client_action',ClientAction);