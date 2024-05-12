/** @odoo-module **/

import { Component, xml } from "@odoo/owl";
import { DashboardItem } from "../DashboardItem/dashboard-item";

export class NumberCard extends Component {
    static template = xml`
        <DashboardItem>
            <div class="d-flex flex-column" style="height:100%">
                <h4>
                     <t t-out="this.props.title"/>
                </h4>
                <br/>
                <div class="statistics">
                    <span><t t-out="this.props.value"/></span>
                </div>
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
