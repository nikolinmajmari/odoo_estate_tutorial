/** @odoo-module **/

export class GalleryArchParser{
    parse(xmlDoc){
        console.log("parsing",xmlDoc);
        const imageField = xmlDoc.getAttribute('image_field');
        const tooltipField = xmlDoc.getAttribute('tooltip_field');
        return {
            imageField   ,
            tooltipField,
        }
    }
}