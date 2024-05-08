/** @odoo-module **/
import { onMounted, useRef } from "@odoo/owl";

export function useAutoFocus(target){
    const ref = useRef(target);
    return onMounted(()=>{
        if(ref.el){
            ref.el.focus();
        }
    });
}