/** @odoo-module **/

import { rewards } from "./rewards";


export function chooseReward(){
    return rewards[Math.floor(Math.random()*rewards.length)]
}

