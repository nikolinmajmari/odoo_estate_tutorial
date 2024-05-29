// /** @odoo-module **/



import {listView} from "@web/views/list/list_view";
import { SCListRenderer } from "./list_renderer";
import { registry } from "@web/core/registry";
import { SCListArchParser } from "./list_arch_parser";

const scListView = {
    ...listView,
    Renderer: SCListRenderer,
    ArchParser: SCListArchParser
}

registry.category("views").remove("list");
registry.category("views").add("list", scListView);