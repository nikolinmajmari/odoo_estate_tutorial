/** @odoo-module **/

import {Component, useState} from "@odoo/owl";

export class Card extends Component {
    static template = "awesome_owl.card";
    static components = {};
    static props = {
        title: {type: String},
        content: {type: String},
    };

    setup() {
        
    }


}
