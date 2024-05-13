/** @odoo-module **/
import { EventBus, toRaw } from "@odoo/owl";
import { Reactive } from "@web/core/utils/reactive";

export class ClickerModel extends Reactive{

    constructor(bus){
        super(...arguments);

        this.counter = 990;
        this.clickBots = 0;
        this.level = 0;
        this.bus = bus;
        this.eventStatus = toRaw({
            'MILESTONE_1k':false
        })
    }

    onAfterIncrement(){
        this.checkForAndTrigger1kMilestoneEvent();
    }

    increment(inc){
        this.counter += inc;
        this.onAfterIncrement();
    }

    checkForAndTrigger1kMilestoneEvent(){
        if(this.counter>=1000 && this.eventStatus['MILESTONE_1k'] === false){
            this.eventStatus['MILESTONE_1k'] = true;
            this.bus.dispatchEvent(new Event('MILESTONE_1k'));
        }
    }

    levelUp(){
        this.level++;
        this.onAfterIncrement();
    }

    canBuyBots(){
        return this.counter >= 1000;
    }

    buyBots(bts){
        this.clickBots += bts;
    }

    buyClickBot(){
        this.clickBots ++ ; 
        this.counter -= 1000;
    }


}