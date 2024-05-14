/** @odoo-module **/
import { EventBus, reactive } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { ClickerModel } from "./clicker_model";
import { doClickerAction } from "./util";

const client = {
    dependencies : ["effect","notification","action"],
    start(env,{effect,notification,action}){

        const model = new ClickerModel();
        model.bus.addEventListener("MILESTONE_1k",function(){
            effect.add({
                type: "rainbow_man", // can be omitted, default type is already "rainbow_man"
                message: "1K Milestone reached! Now you can buy clickbots!",
            });
        });

        model.bus.addEventListener("REWARD",function(ev){
            const reward = ev.detail;
            const closeNotification  = notification.add(
                `Congragulations, you have won ${reward.description}`,{
                    sticky: true,
                    type: "success",
                    buttons:[{
                        name: "Collect",
                        onClick(){
                            closeNotification();
                            reward.apply(model);
                            doClickerAction(action);
                        }
                    }]
                }
            )
        })
        
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