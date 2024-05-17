/** @odoo-module **/

export class GalleryArchParser{
    parse(xmlDoc){
        console.log(xmlDoc);
        const imageField = xmlDoc.getAttribute('image_field');
        return {
            imageField   
        }
    }
}