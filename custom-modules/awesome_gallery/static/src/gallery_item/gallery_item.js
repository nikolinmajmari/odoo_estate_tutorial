/** @odoo-module **/

import { Component } from "@odoo/owl";
import { FileUploader } from "@web/views/fields/file_handler";

export class GalleryItem extends Component {
    static template = "awesome_gallery.gallery-item";
    static components = {FileUploader};
    static props = {
        onClick:{type:Function},
        tooltip: {type:String},
        image:{type:String},
        onUploaded:{type:Function}
    };

    setup() {

    }
}
