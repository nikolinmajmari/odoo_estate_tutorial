/** @odoo-module **/

import { Component, xml } from "@odoo/owl";
import { DashboardItem } from "../DashboardItem/dashboard-item";

export class NumberCard extends Component {
    static template = xml`
        <DashboardItem>
                <label>
                     <t t-out="this.props.title"/>
                </label>
                <br/>
                <div class="statistics">
                    <span><t t-out="this.props.value"/></span>
                </div>
        </DashboardItem>
    `;
    static components = {DashboardItem};
    static props = {
        title:{type:String},
        value:{type:Number}
    };

    setup() {

    }
}
