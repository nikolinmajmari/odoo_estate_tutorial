/** @odoo-module **/
import { Component, onWillStart, onWillUpdateProps, useState } from "@odoo/owl";
import { standardViewProps } from "@web/views/standard_view_props";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { usePager } from "@web/search/pager_hook";
import { Pager } from "@web/core/pager/pager";
import { ControlPanel } from "@web/search/control_panel/control_panel";
import { ActionMenus } from "@web/search/action_menus/action_menus";

export class GalleryController extends Component {
    static template = "awesome_gallery.controller";
    static components = {
        Layout,Pager    ,ActionMenus
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

        this.pager = usePager(()=>{
            return {
                offset: this.model.offset,
                limit: this.model.limit,
                total: this.model.total,
                onUpdate: async ({ offset, limit }) => {
                    this.model.load(this.props.domain,{offset,limit});
                },
            };
        });
        console.log(this.props);

        /// hooks 
        onWillStart(()=>{
            this.model.load(this.props.domain);
        });
        onWillUpdateProps(()=>{
            this.model.load(this.props.domain);
        });
    }


    upload(e,record){

    }
}
