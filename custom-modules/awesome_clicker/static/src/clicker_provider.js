/** @odoo-module **/

import { registry } from "@web/core/registry";
import { doClickerAction } from "./util";

const commandProviderRegistry = registry.category('command_provider');
commandProviderRegistry.add(
    'clicker',{
        provide(env,options){
            console.log(env.services,options,' command registry');
            return [
                {
                    name: 'Open Clicker Game',
                    action(){
                        doClickerAction(env.services.action);
                    }
                },
                {
                    category: 'clicker',
                    name: 'Buy One Click Bot',
                    action(){
                        env.services['awesome_clicker.clicker_service'].buyBot('clickBots');
                    }
                },
            ]
        }
    }
)