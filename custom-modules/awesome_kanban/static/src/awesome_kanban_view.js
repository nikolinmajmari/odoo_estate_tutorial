/** @odoo-module */

// TODO: Define here your AwesomeKanban view

import { registry } from "@web/core/registry";
import {kanbanView} from "@web/views/kanban/kanban_view";
import { AwesomeKanbanController } from "./controllers/kanban_controller";

const awesomeKanbanView = {
    ...kanbanView,
    Controller: AwesomeKanbanController
}

registry.category("views").add("awesome_kanban",awesomeKanbanView);