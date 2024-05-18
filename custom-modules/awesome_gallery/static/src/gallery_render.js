/** @odoo-module **/

import {switchView} from "@web/webclient/actions/action_service";
import { Component } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { GalleryItem } from "./gallery_item/gallery_item";

export class GalleryRender extends Component {
    static template = "awesome_gallery.gallery-render";
    static components = {
        GalleryItem
    };
    static props = {
        model: {type: Object}
    };

    setup() {
        this.action = useService('action');
    }


    onUploaded(e,record){
        this.props.model.saveImage(record,e.data);    
    }


    onClick(record){
        this.action.switchView("form",{
            mode: "edit",
            resId: record.id
        })
    }
}
