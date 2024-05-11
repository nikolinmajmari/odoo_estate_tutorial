/** @odoo-module **/

import { xml,Component } from "@odoo/owl";
import { LazyComponent } from "@web/core/assets";
import { registry } from "@web/core/registry";

export class LazyDashboardLoader extends Component {
    static template = xml`
        <LazyComponent bundle="'awesome_dashboard.dashboard'" Component="'AwesomeDashboard'" props="props"></LazyComponent>
    `;
    static components = {LazyComponent};
    static props = {};

    setup() {
        
    }
}


registry.category('actions').add("awesome_dashboard.dashboard",LazyDashboardLoader);