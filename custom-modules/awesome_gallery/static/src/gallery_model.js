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
        const {imageField,limit} = archInfo;
        this.imageField = imageField;
        this.limit = limit;
        this.keepLast = new KeepLast();

        /// state 
        this.records = [];
    }

    getUrl(id){
        console.log(id,this.resModel,this.imageField);
        const uri =  url("/web/image",{
            model: this.resModel,
            id: id,
            field: this.imageField,
        });
        console.log(uri);
        return uri;
    }

    async load(domain){
        const {records} = await this.keepLast.add(
            this.orm.webSearchRead(this.resModel,domain,{
                limit: this.limit,
                specification : {
                    [this.imageField]:{}
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
    }
}