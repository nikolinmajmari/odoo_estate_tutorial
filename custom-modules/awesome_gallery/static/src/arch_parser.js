/** @odoo-module **/

import {visitXML} from "@web/core/utils/xml";

export class GalleryArchParser{
    parse(xmlDoc){
        console.log("parsing",xmlDoc);
        const imageField = xmlDoc.getAttribute('image_field');
        const tooltipField = xmlDoc.getAttribute('tooltip_field');
        const limit = xmlDoc.getAttribute('limit');
        const fields = new Set();
        let tooltipTemplate = null;
        visitXML(xmlDoc,function(el){
            if(el.tagName=="field"){
                fields.add(el.getAttribute('name'));
            }
            if(el.tagName=="tooltip-template"){
                tooltipTemplate = el;
            }
        });
        
        console.log(tooltipTemplate);
        return {
            imageField,
            limit,
            tooltipTemplate,
            additionalFields: [...new Set(fields)]
        }
    }
}