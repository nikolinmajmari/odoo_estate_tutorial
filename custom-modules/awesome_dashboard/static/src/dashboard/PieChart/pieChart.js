/** @odoo-module **/

import { Component, onMounted, onWillStart, useEffect, useRef } from "@odoo/owl";
import { loadJS } from "@web/core/assets";

export class PieChart extends Component {
    static template = "awesome_dashboard.pie-chart";
    static components = {};
    static props = {
        data:{type:Array}
    };


    get propData(){
        return this.props.data
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
              labels: Object.keys(this.props.data),
              datasets: [{
                data: Object.values(this.props.data),
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
        return Object.keys(this.props.data);
    }

    renderChart(){
        if(!this.props.data){
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

