/** @odoo-module **/
import { EventBus, toRaw } from "@odoo/owl";
import { Reactive } from "@web/core/utils/reactive";


export const CLICKBOT_PRICE= 1000;
export const BIGBOT_PRICE = 5000;
export const MULTIPLY_PRICE = 50000;

export const LEVELS = {
    1: 1000,
    2: 5000,
    3: 100000,
}

export class ClickerModel extends Reactive{

    constructor(bus){
        super(...arguments);

        this.counter = 990;
        this.clickBots = 0;
        this.bigBots = 0;
        this.level = 0;
        this.multiplyFactor = 1;
        this.bus = bus;
        this.eventStatus = toRaw({
            'MILESTONE_1k':false
        })
    }


    updateLevel(){
        for(const level in LEVELS){
            if( this.level == (level - 1) 
                && this.counter >= LEVELS[level
            ]){ //// this is a previous level
                this.level = level;
            }
        }
    }

    
    checkForAndTrigger1kMilestoneEvent(){
        if(this.counter>=1000 && this.eventStatus['MILESTONE_1k'] === false){
            this.eventStatus['MILESTONE_1k'] = true;
            this.bus.dispatchEvent(new Event('MILESTONE_1k'));
            //this.level ++;
        }
    }


    afterCounterUpdate(){
        this.checkForAndTrigger1kMilestoneEvent();
        this.updateLevel();
    }

    increment(inc){
        this.counter += inc;
        this.afterCounterUpdate();
    }

    canBuyClickBots(){
        return this.level >= 1 && this.counter >= CLICKBOT_PRICE;
    }

    buyClickBot(){
        this.clickBots ++ ; 
        this.counter -= 1000;
    }


    canBuyBigBots(){
        return this.level >= 2 && this.counter >= BIGBOT_PRICE;
    }

    buyBigBot(){
        this.bigBots ++;
        this.counter -= 5000;
    }


    canIncreaseMultiplyFactor(){
        return this.level >= 3 && this.counter >= MULTIPLY_PRICE;
    }

    increaseMultiplyFactor(){
        this.multiplyFactor ++;
        this.counter -= 50000;
    }


    updateBotsPoints(){
        this.increment(this.clickBots * 10 * this.multiplyFactor);
        this.increment(this.bigBots * 100 * this.multiplyFactor);
    }


}