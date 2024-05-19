/** @odoo-module **/

import {KanbanController} from "@web/views/kanban/kanban_controller";
import { CustomerList } from "../components/customer_list";


export class AwesomeKanbanController extends KanbanController{
    static template = "awesome_kanban.kanban_controller";
    static components = {
        ...KanbanController.components,
        CustomerList
    }
    setup(){
        super.setup();
        console.log("Hey from Awesome Kanban Controller");
    }
}