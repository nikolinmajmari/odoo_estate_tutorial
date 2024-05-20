/** @odoo-module **/


export function serialSearch(previous,handler,timeout){
    if(previous){
        clearTimeout(previous);
    }
    return setTimeout(handler,timeout);
}