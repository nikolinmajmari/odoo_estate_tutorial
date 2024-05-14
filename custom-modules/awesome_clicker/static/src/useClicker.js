/** @odoo-module **/

import { useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { ClickerModel } from "./clicker_model";

/**
 * 
 * @returns {ClickerModel}
 */
export function useClicker(){
    /** @var {{ClickerModel}} model */
    window.clicker = useService('awesome_clicker.clicker_service');;
    const clicker =  useService('awesome_clicker.clicker_service');
    return useState(clicker);
}