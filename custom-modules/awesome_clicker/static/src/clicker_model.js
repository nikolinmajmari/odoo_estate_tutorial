/** @odoo-module **/
import { EventBus, toRaw } from "@odoo/owl";
import { Reactive } from "@web/core/utils/reactive";
import { chooseReward } from "./util";


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
        this.bots = {
            clickBots:{
                type: "Click Bot",
                purchased: 0,
                level: 1,
                price: 1000,
                increment: 10
            },
            bigBots: {
                type: "Big Bot",
                purchased: 0,
                level: 2,
                price: 5000,
                increment: 100
            }
        };
        for(const key in this.bots){
            Object.assign(this.bots[key],{id:key});
        }
        this.level = 0;
        this.multipler = 1;
        this.bus = bus;
        this.eventStatus = toRaw({
            'MILESTONE_1k':false
        })
    }

    get botKeys(){
        return Object.keys(this.bots);
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

    buyBot(type){
        this.bots[type].purchased ++;
        this.counter -= this.bots[type].price;
    }

    canBuyBots(type){
        return this.level >= this.bots[type].level
        && this.counter >= this.bots[type].price;
    }

    // canBuyClickBots(){
    //     return this.level >= this.bots.clickBots.level 
    //     && this.counter >= this.bots.clickBots.price;
    // }

    // buyClickBot(){
    //     this.bots.clickBots.purchased ++; 
    //     this.counter -= this.bots.clickBots.price;
    // }

    // canBuyBigBots(){
    //     return this.level >= this.bots.bigBots.level 
    //         && this.counter >= this.bots.bigBots.price;
    // }

    // buyBigBot(){
    //     this.bots.bigBots.purchased ++;
    //     this.counter -= this.bots.bigBots.price;
    // }

    canBuyMultipler(){
        return this.level >= 3 && this.counter >= MULTIPLY_PRICE;
    }

    increaseMultipler(){
        this.multipler ++;
        this.counter -= 50000;
    }

    updateBotsPoints(){
        for(const key in this.bots){
            this.increment(this.bots[key].purchased * this.bots[key].increment * this.multipler);
        }
    }

    giveReward(){
        const reward = chooseReward();
        reward.apply(this);
    }
}