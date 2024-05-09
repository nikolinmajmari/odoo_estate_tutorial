/** @odoo-module **/

import { registry } from "@web/core/registry";
import { startServices } from "@web/env";

const sharedDataService = {
    start(env){
        let state = {};
        return {
            getValue(key){
                return state[key];
            },
            setValue(key,value){
                state[key] = value;
            }
        }
    }
};

registry.category('services').add("sharedDataService",sharedDataService)