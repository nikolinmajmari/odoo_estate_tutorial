/** @odoo-module **/

import {Component,useState} from "@odoo/owl";
import { Center } from "../center/center";

export class Counter  extends Component{

    static template = "awesome_owl.counter"

    static props = {
        onChange: {type: Function}
    }
    static components = {
        Center
    }
    setup(){
        console.log("Counter::setup");
        this.state = useState({value: 0})
        console.log("Counter::afterSetup",this.state);
    }

    increment(){
        this.state.value ++;
        this.props.onChange(+1);
    }
    decrement(){
        this.state.value --;
        
        this.props.onChange(-1);
    }
}