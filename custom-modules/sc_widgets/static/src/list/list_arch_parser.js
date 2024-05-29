/** @odoo-module **/

import {ListArchParser} from "@web/views/list/list_arch_parser";
import { AGG_ALLOW_TO_GROUPS_PROP } from "./list_renderer";

export class SCListArchParser extends ListArchParser{
    parse(xmlDoc, models, modelName){
      ///  console.log('parsing',xmlDoc);
        const parsed =  {
            ...super.parse(xmlDoc,models,modelName)
        };
        const attribute = xmlDoc.getAttribute('allow_aggregate_groups');
        if(attribute){
            console.log(attribute);console.log(JSON.parse(attribute));
            parsed['allowAggregateGroups'] = JSON.parse(attribute);
        }
        return parsed;
    }
}