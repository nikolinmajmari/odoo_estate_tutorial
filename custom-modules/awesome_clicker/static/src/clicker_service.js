/** @odoo-module **/
import { EventBus, reactive } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { ClickerModel } from "./clicker_model";
import { doClickerAction, initObjectPresistence } from "./util";
import { browser } from "@web/core/browser/browser";

const CLICKER_MODEL_STORAGE_KEY= 'awesome_clicker.cicker';

const client = {
    dependencies : ["effect","notification","action"],
    start(env,{effect,notification,action}){
        const model = new ClickerModel();
        //// presistence loads old data when browser is reloaded and updates 
        //// stored data every t seconds to prevent data loss
        initObjectPresistence(model,CLICKER_MODEL_STORAGE_KEY,1000);

        model.bus.addEventListener("MILESTONE",function(event){
            console.log(event);
            const milestone = event.detail;
            effect.add({
                type: "rainbow_man", // can be omitted, default type is already "rainbow_man"
                message: `1K Milestone reached! Now you can buy ${milestone.unlocked } !`,
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
        });
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