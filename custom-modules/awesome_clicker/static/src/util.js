/** @odoo-module **/

import { browser } from "@web/core/browser/browser";
import { migrations } from "./clicker_model_migration";

export function choose(rewards){
    return rewards[Math.floor(Math.random()*rewards.length)]
}


export function doClickerAction(action){
    action.doAction({
        type: "ir.actions.client",
        tag: "awesome_clicker.client_action",
        target: "new",
        name: "Clicker game"
    });
}



export function initObjectPresistence(model,key,timeout){
    //// load previous data 
    const storedValue = browser.localStorage.getItem(key);
    if(storedValue != null){
        const parsed = JSON.parse(storedValue);
        if(parsed.version !== model.version){
            const selected = findMigration(migrations,parsed.version,model.version);
            applyMigrations(parsed,selected);
        }
        Object.assign(model,parsed);
    }
    return setInterval(function(){
        const serialized = JSON.stringify(model,function(key,value){
            if(key!=='bus'){
                return value;
            }
        });
        browser.localStorage.setItem(key,serialized);
    },timeout);
    //// setup timers for data update 
}


/**
 * 
 * @param {Array} all 
 * @param {number} from 
 * @param {number} to 
 * @returns 
 */
export function findMigration(all,from,to){
    let selected = all.filter(m=>m.fromVersion == from && m.toVersion == to).pop();
    if(selected){
        return [selected];
    }
    selected = [];
    let next = null;
    while(true){
        next = all.find((m)=>m.fromVersion == from && Math.abs(m.toVersion - to) <= Math.abs(m.fromVersion - to));
        if(!next){
            throw Error("Migration path can not be found!");
        }
        selected.push(next);
        if(next.toVersion==to){
            break;
        }
        from = next.toVersion;
    }
    return selected;
}

export function applyMigrations(object,migrations){
    for(const migration of migrations){
        migration.apply(object);
    }
}
