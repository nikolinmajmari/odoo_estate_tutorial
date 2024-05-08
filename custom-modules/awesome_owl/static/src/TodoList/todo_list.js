/** @odoo-module **/

import {Component,onMounted,useRef,useState} from "@odoo/owl";
import { TodoItem } from "../TodoItem/todo_item";
import { useAutoFocus } from "../utils";

export class TodoList extends Component {
    static template = "awesome_owl.todo_list";
    static components = {
        TodoItem
    };
    static props = {};

    setup() {
        this.inputRef = useRef("input-ref");
        this.counter = useState({value:0});
        this.todos = useState([
        ]);
        useAutoFocus('input-ref');
    }

    /**
     * 
     * @param {number} id 
     * @returns 
     */
    createToggleItem(id){
        return (()=>{
            const index = this.todos.findIndex(item=>item.id === id);
            if(index !== -1){
                this.todos[index].isCompleted = !this.todos[index].isCompleted;
            }
        });
    }

    /**
     * 
     * @param {number} id 
     * @returns 
     */
    createRemoveItem(id){
        return (()=>{
            const index = this.todos.findIndex(item=>item.id === id);
            this.todos.splice(index,1);
        });
    }

   /**
    * 
    * @param {Event} event 
    */
    addTodo(event){
        if(event.keyCode === 13){
            if((event.target.value??"").trim().length===0){
                return ;
            }
            this.counter.value ++;
            this.todos.push({
                id: this.counter.value,
                description: event.target.value,
                isCompleted: false,
            })  
            event.target.value = "";
            //event.target.blur();
        }
    }
}
