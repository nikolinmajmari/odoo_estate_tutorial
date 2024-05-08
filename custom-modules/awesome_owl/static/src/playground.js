/** @odoo-module **/

import { Component,useState } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { Card } from "./card/card";
import { TodoList } from "./TodoList/todo_list";

export class Playground extends Component {
    static template = "awesome_owl.playground";

    setup(){
        console.log("Playground::setup")
        this.html = "<p>Playground html hwllo</p>"
        this.state = useState({sum:0})
    }
    static components = {Counter,Card,TodoList};


    updateSum(change){
        console.log(this,this.state);
        this.state.sum +=change;
    }
}
