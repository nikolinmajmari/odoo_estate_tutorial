/** @odoo-module **/

import { Component } from "@odoo/owl";

export class DashboardItem extends Component {
    static template = "awesome_dashboard.DashboardItem";
    static components = {};
    static defaultProps = {
        size: 1,
    }
    static props = {
        size:{type:Number}
    };
    setup() {

    }

    get size(){
        return this.props.size * 18;
    }
}
