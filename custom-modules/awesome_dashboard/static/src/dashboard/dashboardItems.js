/** @odoo-module **/

import { registry } from "@web/core/registry";
import { NumberCard } from "./NumberCard/numberCard";
import { PieChart } from "./PieChart/pieChart";

export const dashboardItems = [
    {
        id:"average_quantity",
        description : "",
        show: true,
        Component: NumberCard,
        size: 2,
        props:(data)=>{
            return ({
                title: "Average t-shirt ordered amount",
                value: data.average_quantity,
            });
        },

    },
    {
        id:"average_time",
        description : "",
        show: true,
        Component: NumberCard,
        size: 3,
        props:(data)=>({
            title: "Average Time",
            value: data.average_time,
        }),
        
    },
    {
        id:"nb_cancelled_orders",
        description : "",
        Component: NumberCard,
        size: 2,
        
        show: true,
        props:(data)=>({
            title: "Number of canceled orders",
            value: data.nb_cancelled_orders,
        }),
        
    },
    {
        id:"nb_new_orders",
        description : "",
        
        show: true,
        Component: NumberCard,
        props:(data)=>({
            title: "Number of new orders",
            value: data.nb_new_orders,
        }),
        
    },
    {
        id:"total_amount",
        description : "",
        
        show: true,
        Component: NumberCard,
        size: 2,
        props:(data)=>({
            title: "Total Amount",
            value: data.total_amount,
        }),
        
    },
    {
        id:"orders_by_size",
        description : "",
        
        show: true,
        Component: PieChart,
        size: 2,
        props:(data)=>({
            title: "Orders by size chart",
            value: data.orders_by_size,
        }),
        
    },
];

registry.category("data").add('awesome_dashboard_items',dashboardItems);