// /** @odoo-module **/


import {ListRenderer} from "@web/views/list/list_renderer";
import { useService } from "@web/core/utils/hooks";
import { session } from "@web/session";
import { onWillStart } from "@odoo/owl";

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
        this.userService = useService('user');
        onWillStart(async ()=>{
            this.aggregatesAuthorized = await this.userService.hasGroup('base.group_system');
        });
    }
}