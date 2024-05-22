/** @odoo-module **/


import {ListRenderer} from "@web/views/list/list_renderer";


export class SCListRenderer extends ListRenderer{
    // static template = "sc_widgets.ListRenderer";
    static props = {
        ...ListRenderer.props
    };
    static components = {
        ...ListRenderer.components
    };

    setup(){
        super.setup();
    }
}