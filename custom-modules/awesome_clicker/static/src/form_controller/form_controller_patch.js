/** @odoo-module **/
import { FormController } from "@web/views/form/form_controller";
import { patch } from "@web/core/utils/patch";
import { useClicker } from "../useClicker";


patch(FormController,{
    setup(){
        const clicker = useClicker();
        clicker.g
    }
})