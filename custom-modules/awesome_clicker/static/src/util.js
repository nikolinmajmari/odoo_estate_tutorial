/** @odoo-module **/

import { browser } from "@web/core/browser/browser";
import { rewards } from "./rewards";


export function choose(rewards){
    return rewards[Math.floor(Math.random()*rewards.length)]
}


export function doClickerAction(action){
    action.doAction({
        type: "ir.actions.client",
        tag: "awesome_clicker.client_action",
        target: "new",
        name: "Clicker game"
    });
}



export function initObjectPresistence(model,key,timeout){
    //// load previous data 
    const storedValue = browser.localStorage.getItem(key);
    if(storedValue != null){
        const parsed = JSON.parse(storedValue);
        Object.assign(model,parsed);
    }
    return setInterval(function(){
        const serialized = JSON.stringify(model,function(key,value){
            if(key!=='bus'){
                return value;
            }
        });
        browser.localStorage.setItem(key,serialized);
    },timeout);
    //// setup timers for data update 
}