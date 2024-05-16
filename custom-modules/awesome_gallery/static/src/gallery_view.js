/** @odoo-module */

// TODO: Begin here!

import { registry } from "@web/core/registry";
import { GaleryController } from "./galery_controller/galery_controller";


export const galeryView = {
    type: "gallery",
    display_name : "Gallery View",
    icon : "oi oi-view-list",
    multiRecord: true,
    Controller: GaleryController   
}

registry.category("views").add("gallery",galeryView)