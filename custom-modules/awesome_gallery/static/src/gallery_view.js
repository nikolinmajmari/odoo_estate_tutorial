/** @odoo-module */

// TODO: Begin here!

import { registry } from "@web/core/registry";
import { GalleryController } from "./gallery_controller";
import { GalleryArchParser } from "./arch_parser";
import { GalleryModel } from "./gallery_model";
import { GalleryRender } from "./gallery_render";
export const galleryView = {
    type: "gallery",
    display_name: "Gallery",
    icon: "fa fa-picture-o",
    multiRecord: true,
    Controller: GalleryController,
    ArchParser: GalleryArchParser,
    Model: GalleryModel,
    Render: GalleryRender,

    props: (genericProps, view) => {
        const { arch } = genericProps;
        const parser = new view.ArchParser();
        const archInfo = parser.parse(arch);
        return {
            ...genericProps,
            archInfo,
            Model: view.Model,
            Render: view.Render,
            tooltipTemplate: archInfo.tooltipTemplate
        }
    }
}

registry.category("views").add("gallery",galleryView)