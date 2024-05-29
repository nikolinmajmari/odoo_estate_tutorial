// /** @odoo-module **/


import {ListRenderer} from "@web/views/list/list_renderer";
import { useService } from "@web/core/utils/hooks";
import { onWillStart } from "@odoo/owl";

export class SCListRenderer extends ListRenderer{
    // static template = "sc_widgets.ListRenderer";
    static props = {
        ...ListRenderer.props
    };
    static components = {
        ...ListRenderer.components
    };

    setup(){
        super.setup();
        this.userService = useService('user');
        onWillStart(async ()=>{
            window.user = this.userService;
            this.aggregatesAuthorized = await this.hasGroups(this.props.archInfo.allowAggregateGroups);
            console.log("evaluated as ",this.aggregatesAuthorized);
        });
    }


    async hasGroups(groups){
        return Promise.all(
            Array.from(groups).map(
                (group)=>this.userService.hasGroup(group)
            )
        ).then(
            results=>results.reduce(
                (acc,next)=>acc||next,false
            )
        );
    }
}