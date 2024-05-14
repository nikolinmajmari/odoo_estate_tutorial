/** @odoo-module **/
import { EventBus, toRaw } from "@odoo/owl";
import { Reactive } from "@web/core/utils/reactive";
import { choose, chooseReward } from "./util";
import { rewards } from "./rewards";


export const CLICKBOT_PRICE= 1000;
export const BIGBOT_PRICE = 5000;
export const MULTIPLY_PRICE = 50000;

export const LEVELS = {
    1: 1000,
    2: 5000,
    3: 100000,
}

/**
 * 
 */
export class ClickerModel extends Reactive{

    constructor(){
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
        this.level = 0;
        this.multipler = 1;
        this.bus = new EventBus();
        this.eventStatus = toRaw({
            'MILESTONE_1k':false
        });

        //// side effects 
        setInterval(()=>{
            this.incrementBotPoints();
        },10000);
    }

    /**
     * 
     * @param {number} inc 
     */
    increment(inc){
        this.counter += inc;
        this.checkForAndTrigger1kMilestoneEvent();
        this.updateLevel();
    }

    /**
     * 
     * @param {string} key
     * @returns {{type: String, purchased: number, level: number, price: number, increment: number}} 
     */
    getBot(key){
        return this.bots[key];
    }

    /**
     * 
     * @param {string} type 
     */
    buyBot(type){
        this.getBot(type).purchased ++;
        this.counter -= this.getBot(type).price;
    }

    /**
     * 
     * @param {string} type 
     * @returns 
     */
    canBuyBots(type){
        return this.level >= this.bots[type].level
        && this.counter >= this.bots[type].price;
    }

    /// multiplier

    /**
     * 
     * @returns 
     */
    canBuyMultipler(){
        return this.level >= 3 && this.counter >= MULTIPLY_PRICE;
    }

    /**
     * 
     */
    buyMultipler(){
        this.multipler ++;
        this.counter -= 50000;
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

    incrementBotPoints(){
        for(const key in this.bots){
            this.increment(this.bots[key].purchased * this.bots[key].increment * this.multipler);
        }
    }

    getReward(){
        const availableRewards = rewards.filter((reward)=>{
            return (!reward.minLevel || this.level >= reward.minLevel )
            && (!reward.maxLevel || this.level <= reward.maxLevel )
        });
        const reward = choose(rewards);
        this.bus.trigger("REWARD",reward);
        return reward;
    }
}