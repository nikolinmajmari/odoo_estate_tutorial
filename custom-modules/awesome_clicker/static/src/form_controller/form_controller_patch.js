/** @odoo-module **/
import { FormController } from "@web/views/form/form_controller";
import { patch } from "@web/core/utils/patch";
import { useClicker } from "../useClicker";
import { chooseReward } from "../util";


patch(FormController.prototype,{
    setup(){
        super.setup(...arguments);
        console.log("hey")
        const clicker = useClicker();
        if(Math.random()<=1.01){
            clicker.getReward();
        }
    }
})