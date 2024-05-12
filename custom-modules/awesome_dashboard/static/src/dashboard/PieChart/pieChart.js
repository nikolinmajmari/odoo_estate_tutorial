/** @odoo-module **/

import { Component, onMounted, onWillStart, useEffect, useRef } from "@odoo/owl";
import { loadJS } from "@web/core/assets";
import { DashboardItem } from "../DashboardItem/dashboard-item";

export class PieChart extends Component {
    static template = "awesome_dashboard.pie-chart";
    static components = {DashboardItem};
    static props = {
        value:{type:Object}
    };


    get propData(){
        return this.props.value
    }

    setup() {
        this.chartRef = useRef('chart-ref');
        this.chart = null;
        onWillStart( ()=> loadJS(["/web/static/lib/Chart/Chart.js"]));
        useEffect(()=>this.renderChart());
        this.onWillUnmount(()=>this.onWillUnmount())
    }

    onWillUnmount(){
        if(this.chart){
            this.chart.destroy();
        }
    }

    getChartConfig(){
        return {
            type: 'pie',
            data: {
              labels: Object.keys(this.props.value),
              datasets: [{
                data: Object.values(this.props.value),
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
              }]
            },
        };
    }

    getChartLabels(){
        return Object.keys(this.props.value);
    }

    renderChart(){
        if(!this.props){
            return;
        }
        if (this.chart){
            this.chart.destroy();   
        }
        this.chart = new Chart(
            this.chartRef.el, 
            this.getChartConfig()
        );
    }
}

