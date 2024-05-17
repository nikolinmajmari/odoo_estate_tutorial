/** @odoo-module **/

import {switchView} from "@web/webclient/actions/action_service";
import { Component } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

export class GalleryRender extends Component {
    static template = "awesome_gallery.gallery-render";
    static components = {};
    static props = {
        model: {type: Object}
    };

    setup() {
        this.action = useService('action');
    }


    onClick(record){
        this.action.switchView("form",{
            mode: "edit",
            resId: record.id
        })
    }
}
