/** @odoo-module **/

import { reactive, toRaw } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";


// function memoize(func){
//     const name = func.name ? func.name + '(memoized)':'(memoized)';
//     const cache = new Map();
//     return {
//         [name](...args){
//             if(!cache.has(args[0])){
//                 cache.set(args[0],func(...args));
//             }
//             return cache.get(args[0]);
//         }
//     }[name]
// }
/**
 * 
 * @param {Function} func 
 * @returns 
 */
function memoize(func){
    const cache = reactive(new Map(),()=>{console.log('map changed')});
    return async function(...args){
        if(!cache.has(args[0])){ 
            const data = await func.call(this,...args);
            cache.set(args[0],data);
            setInterval(async ()=>{
                const entry = cache.get(args[0]);
                const data = await func.call(this,...args);
                for(const key in data){
                    entry[key] = data[key];
                }
            },5000);
        }
        console.log(cache,cache.get(args[0]));
        return cache.get(args[0]);
    }
}

function reactiveMemoize(func){
    const cache = new Map();
    return async function(...args){
        //// load data and return reactive object
        if(!cache.has(args[0])){
            const data = await func.call(this,...args);
            const result = reactive({
                data: toRaw(data)
            },()=>{
                console.log("result is updated");
            });
            cache.set(args[0],result);
            // setup timeut listeners 
            setInterval(async ()=>{
                const data = await func.call(this,...args);
                const result = cache.get(args[0]);
                result.data = data;
            },1000)
        }
        return cache.get(args[0])
    }
}


const statistics = {
    dependencies: ["rpc"],
    start(env,{rpc}){

        const statistics = reactive({isReady:false});

        // var _loadStatistics = memoize(function(){
        //     return rpc("/awesome_dashboard/statistics");
        // });
        var loadData = async function(){
            const updates = await rpc("/awesome_dashboard/statistics");
            Object.assign(statistics,updates,{isReady:true});
        }
        setInterval(loadData,10000);
        loadData();

        return statistics;

    }
}


registry.category('services').add("awesome_dashboard.statistics",statistics)