/** @odoo-module **/
import { EventBus, reactive } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { ClickerModel } from "./clicker_model";

const client = {
    dependencies : ["effect"],
    start(env,{effect}){

        const bus = new EventBus();
        bus.addEventListener("MILESTONE_1k",function(){
            effect.add({
                type: "rainbow_man", // can be omitted, default type is already "rainbow_man"
                message: "1K Milestone reached! Now you can buy clickbots!",
            });
        });

        const model =  new ClickerModel(bus);
        setInterval(()=>{
            model.increment(model.clickBots*10);
        },10000);
        setInterval(()=>{
            model.increment(model.bigBots*100);
        },10000);
        return model;

        const state = reactive({
            counter:1234,
            level: 0,
            clickBots: 0,
        });
        return {
            state,
            increment(inc){
                state.counter +=inc;
            },
        }
    }
}

registry.category('services').add('awesome_clicker.clicker_service',client);