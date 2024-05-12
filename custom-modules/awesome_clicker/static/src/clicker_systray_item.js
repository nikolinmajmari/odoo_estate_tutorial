/** @odoo-module **/
import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
export class ClickerSytrayItem extends Component {
    static template = "awesome_clicker.Hello";
    static components = {};
    static props = {};

    setup() {

    }
}


registry.category('systray').add('clicker.item',{
    Component: ClickerSytrayItem
})