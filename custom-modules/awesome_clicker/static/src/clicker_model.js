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
        this.trees = {
            pearTree:{
                purchased: 0,
                fruit: "pear",
                price: 5,
                level: 4,
            },
            cherryTree:{
                purchased: 0,  
                fruit: "cherry",
                price: 10,
                level: 4
            },
            // peachTree:{
            //     purchased: 0,
            //     fruit: "pearch",
            //     price: 20,
            //     level: 4
            // }
        };
        this.fruits = {
            pear: 0,
            cherry: 0,
            // pearch: 0
        };
        this.level = 0;
        this.multipler = 1;
        this.bus = new EventBus();

        //// side effects 
        setInterval(()=>{
            this.incrementBotPoints();
        },10000);
        setInterval(()=>{
            this.produceFruits();
        },1000);
    }

    get milestones(){
        return [
            { clicks: 1000, unlocked : "Click Bots"},
            { clicks: 5000, unlocked : "Big Bots"},
            { clicks: 100000, unlocked: "Power Multiplers"},
            { clicks: 1000000, unlocked: "pear tree & cherry tree"}
        ];
    }


    get treesCount(){
        return Object.values(this.trees).reduce((acc,tree)=>acc+tree.purchased,0);
    }

    get fruitsCount(){
        return Object.values(this.fruits).reduce((acc,next)=>acc+next,0);
    }

    /**
     * 
     * @param {number} inc 
     */
    increment(inc){
        this.counter += inc;
        this.updateLevel();
    }

    /**
     * 
     * @param {string} key
     * @returns {{type: String, purchased: number, level: number, price: number, increment: number}} 
     */
    getBot(key){
        if(!Object.keys(this.bots).includes(key)){
            throw Error("Could not find bot with key"+key);
        }
        return this.bots[key];
    }

    /**
     * 
     * @param {string} type 
     * @returns 
     */
    canBuyBots(type){
        return this.level >= this.getBot(type).level
        && this.counter >= this.getBot(type).price;
    }

    /**
     * 
     * @param {string} type 
     */
    buyBot(type){
        if(!this.canBuyBots(type)){
            return false;
        }
        this.getBot(type).purchased ++;
        this.counter -= this.getBot(type).price;
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
        if(!this.canBuyMultipler()){
            return false;
        }
        this.multipler ++;
        this.counter -= 50000;
    }

    /**
     * 
     */
    updateLevel(){
        for(let i=0;i<this.milestones.length;i++){
            if(i==this.level && this.counter >=this.milestones[i].clicks){
                this.bus.dispatchEvent(new CustomEvent("MILESTONE",{
                    detail: this.milestones[i]
                }));
                this.level++;
            }
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


    getTree(key){
        if(!Object.keys(this.trees).includes(key)){
            throw new Error("Could not find tree with key "+key);
        }
        return this.trees[key];
    }

    getFruit(key){
        if(!Object.keys(this.fruits).includes(key)){
            throw new Error("Could not find the fruit with key "+key);
        }
        return this.fruits[key];
    }

    canBuyTrees(key){
        return this.level == this.getTree(key).level 
            && this.counter >= this.getTree(key).price;
    }

    buyTree(key){
        if(!this.canBuyTrees(key)){
            return false;
        }
        this.getTree(key).purchased+=1;
        this.counter -= this.getTree(key).price;
    }

    produceFruits(){
        for(const key in this.trees){
            this.fruits[this.getTree(key).fruit] += this.getTree(key).purchased * this.multipler;
        }
    }

}