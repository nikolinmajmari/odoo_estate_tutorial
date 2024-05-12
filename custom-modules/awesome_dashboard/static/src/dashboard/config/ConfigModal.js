/** @odoo-module **/

import { Component,onWillStart,onWillUnmount,onWillUpdateProps,useEffect,useState,xml } from "@odoo/owl";
import { Modal } from "../modal/Modal";
export class ConfigModal extends Component {
    static template = xml`
    <Modal close="props.close">
        <div class="modal-header">
            <h5 class="modal-title">Dashboard Items Configuration</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <t t-foreach="this.state.items" t-as="item" t-key="item.id">
                <div class="form-check">
                    <input t-on-click="this.createToggleItemHandle(item.id)" class="form-check-input" type="checkbox" t-att-checked="item.show"/>
                    <label class="form-check-label" for="item.id">
                        <t t-out="item.id"/>
                    </label>
                </div>
            </t>
        </div>
        <div class="modal-footer">
            <button type="button" t-on-click="this.save" class="btn btn-primary o-default-button">Done</button>
        </div>
    </Modal>
    `;
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
