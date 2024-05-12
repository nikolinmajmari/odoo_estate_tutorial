/** @odoo-module **/

import { Component,onWillStart,onWillUnmount,onWillUpdateProps,useEffect,useState,xml } from "@odoo/owl";
import { Modal } from "../modal/Modal";
export class ConfigModal extends Component {
    static template = 'awesome_dashboard.ConfigModal';
    static components = {Modal};
    static props = {
        update:{type:Function},
        config: {type:Object},
        close: {type:Function}
    };

    setup() {
        this.state = useState({items: this.props.config});

        onWillStart(()=>{
            console.log('started ',this.props);
            this.state.items = this.props.config;   
        })
    }

    createToggleItemHandle(id){
        return ()=>{
            const index = this.state.items.findIndex(i=>i.id === id);
            if(index !== -1){
                console.log("before : ",this.state.items);
                this.state.items[index].show = !this.state.items[index].show;
                console.log("after : ",this.state.items);
            }
        }
    }

    save(){
        console.log('updating props with ',this.state.items
        .filter((i)=>i.show)
        .map(i=>i.id))
        this.props.update(
            this.state.items
            .filter((i)=>i.show)
            .map(i=>i.id)
        );
        this.props.close();
    }
}
