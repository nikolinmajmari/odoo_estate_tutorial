/** @odoo-module **/

import { KeepLast } from "@web/core/utils/concurrency";
import { Reactive } from "@web/core/utils/reactive";
import {url} from "@web/core/utils/urls";


export class GalleryModel extends Reactive{
    constructor(orm,resModel,archInfo){
        super();
        /// services 
        this.orm = orm;

        /// config 
        this.resModel = resModel;
        const {imageField,tooltipField,limit} = archInfo;
        this.imageField = imageField;
        this.tooltipField = tooltipField;
        this.limit = limit;
        this.keepLast = new KeepLast();

        /// state 
        this.records = [];
        this.offset = 0;
        this.limit = 10;
        this.total = 0;
    }

    getUrl(id){
        const uri =  url("/web/image",{
            model: this.resModel,
            id: id,
            field: this.imageField,
        });
        return uri;
    }

    /**
     * 
     * @param {string} domain 
     * @param {{limit:number,offset:number}} args 
     */
    async load(domain,args={}){
        const pageArgs = {
            offset: this.offset,
            limit:this.limit,
            ...args,
        }
        console.log('loading',pageArgs);
        const {records,length} = await this.keepLast.add(
            this.orm.webSearchRead(this.resModel,
                domain,
                {
                ...pageArgs,
                specification : {
                    [this.imageField]:{},
                    [this.tooltipField]:{}
                },
                context:{
                    bin_size: true
                }
            })
        );
        this.records = records.map((image)=>({
                url: this.getUrl(image.id),
                ...image
            })
        );
        this.offset = pageArgs.offset;
        this.limit = pageArgs.limit;
        this.total = length;
    }
}