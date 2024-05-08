/** @odoo-module **/

import {Component} from "@odoo/owl"


export class TodoItem extends Component {
    static template = "awesome_owl.todo_item";
    static components = {};
    static props = {
        id:{type:Number},
        description:{type:String},
        isCompleted:{type:Boolean},
        toggle:{type:Function},
        remove:{type:Function}
    };

    setup() {

    }
}
