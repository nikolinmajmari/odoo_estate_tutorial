/** @odoo-module **/
import { reactive } from "@odoo/owl";
import { registry } from "@web/core/registry";

const client = {
    dependencies : [],
    start(env,{}){
        const state = reactive({counter:0});
        return {
            state,
            increment(){
                state.counter ++;
            },
            incrementBy10(){
                state.counter += 10;
            }
        }
    }
}

registry.category('services').add('awesome_clicker.clicker_service',client);