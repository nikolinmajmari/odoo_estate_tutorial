/** @odoo-module **/

import {switchView} from "@web/webclient/actions/action_service";
import { Component, xml } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { GalleryItem } from "./gallery_item/gallery_item";
import { createElement } from "@web/core/utils/xml";

export class GalleryRender extends Component {
    static template = "awesome_gallery.gallery-render";
    static components = {
        GalleryItem
    };
    static props = {
        model: {type: Object},
        tooltipTemplate: {
            optional: true,
            type: Element,
        }
    };

    setup() {
        this.action = useService('action');
        console.log("render",this.props);
        if(this.props.tooltipTemplate){
            const fieldsToReplace = this.props.tooltipTemplate.querySelectorAll('field');
            for(const field of fieldsToReplace){
                const fieldName = field.getAttribute('name');
                const t = document.createElement('t');
                t.setAttribute('t-esc',`record.${fieldName}`);
                field.replaceWith(t);
            }
            const html = createElement("t", [this.props.tooltipTemplate]).outerHTML;
            this.owlTooltipTemplate = xml`${html}`;
            console.log(
                xml`${html}`,' and ',html
            );
        }   
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
