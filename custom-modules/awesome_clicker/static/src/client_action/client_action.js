/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

export class ClientAction extends Component {
    static template = "awesome_clicker.client";
    static components = {};
    static props = {};

    setup() {
        const {state,incrementBy10} = useService("awesome_clicker.clicker_service");
        this.clicker = useState(state);
        this.increment = incrementBy10;
    }
}


registry.category('actions').add('awesome_clicker.client_action',ClientAction);