/** @odoo-module **/

import { Component, xml } from "@odoo/owl";
import { humanNumber } from "@web/core/utils/numbers";


export class ClickValue extends Component {
    static template = xml`
        <span t-attf-data-tooltip="{{this.props.value}}"><t t-out="this.humanNumber"/></span> 
    `;
    static components = {};
    static props = {
        value:{type:Number}
    };

    get humanNumber(){
        return humanNumber(this.props.value);
    }

    setup() {

    }
}
