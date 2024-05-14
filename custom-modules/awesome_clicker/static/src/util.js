/** @odoo-module **/

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