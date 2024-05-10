/** @odoo-module **/

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
    const cache = new Map();
    return function(...args){
        if(!cache.has(args[0])){
            cache.set(args[0],func.call(this,...args))
        }
        return cache.get(args[0]);
    }
}



const statistics = {
    dependencies: ["rpc"],
    start(env,{rpc}){

        var _loadStatistics = memoize(function(){
            return  rpc("/awesome_dashboard/statistics");
        });

        console.log(_loadStatistics);

        return {
            loadStatistics: _loadStatistics,
        }

    }
}


registry.category('services').add("awesome_dashboard.statistics",statistics)