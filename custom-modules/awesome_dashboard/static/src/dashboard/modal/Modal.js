/** @odoo-module **/

import { Component, onMounted, useEffect, useRef, xml } from "@odoo/owl";

export class Modal extends Component {
    static template = xml`
        <t t-portal="'body'">
            <div class="modal" tabindex="-1" t-ref='modal-ref'>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <t t-slot="default">
                        <div class="modal-header">
                            <h5 class="modal-title">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                        </t>
                    </div>
                </div>
            </div>
        </t>
    `;
    static components = {};
    static props = {
        slot: {type: String},
        close:{type: Function}
    };

    setup() {
        this.modalRef = useRef('modal-ref');
        useEffect(()=>{
          $(this.modalRef.el).modal('show');
          $(this.modalRef.el).on("hidden.bs.modal",()=>{
            this.props.close();
          });
        })
    }
}
