/** @odoo-module **/

import { Component } from "@odoo/owl";
import { FileUploader } from "@web/views/fields/file_handler";
import { GalleryModel } from "../gallery_model";
import { url } from "@web/core/utils/urls";
import { useTooltip } from "@web/core/tooltip/tooltip_hook";

export class GalleryItem extends Component {
    static template = "awesome_gallery.gallery-item";
    static components = {FileUploader};
    static props = {
        model: {type: GalleryModel},
        record:{type:Object},
        onClick:{type:Function},
        tooltipTemplate: {optional: true,type:String},
        onUploaded:{type:Function}
    };

    get record(){
        return this.props.record;
    }

    setup() {       
        if (this.props.tooltipTemplate) {
            this.tooltip = useTooltip("tooltip", {
                info: { record: this.props.record },
                template: this.props.tooltipTemplate,
            });
        }
    }

    url(record){
        const {id,write_date} = record;
        const uri =  url("/web/image",{
            model: this.props.model.resModel,
            id: id,
            field: this.props.model.imageField,
            write_date
        });
        return uri;
    }
}
