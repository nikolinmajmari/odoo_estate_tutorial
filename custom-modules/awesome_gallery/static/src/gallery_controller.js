/** @odoo-module **/
import { Component, onWillStart, onWillUpdateProps, useState } from "@odoo/owl";
import { standardViewProps } from "@web/views/standard_view_props";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { KeepLast } from "@web/core/utils/concurrency";


export class GalleryController extends Component {
    static template = "awesome_gallery.controller";
    static components = {
        Layout
    };
    static props = {
        ...standardViewProps,
        Model:{type:Object},
        Render:{type:Object},
        archInfo:{type:Object},
    };

    setup() {
        const orm = useService('orm');
        this.model = useState( 
            new this.props.Model(
                orm,
                this.props.resModel,
                this.props.archInfo
            )
        );
       onWillStart(()=>{
        this.model.load(this.props.domain);
       });
       onWillUpdateProps(()=>{
        this.model.load(this.props.domain);
       })
    }
}
