import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { CloudinaryConfiguration } from './cloudinary-configuration.service';

declare var cloudinary: any;
declare var jQuery: any;

@Injectable()
export class Cloudinary {
    private instance;
    constructor(private configuration: CloudinaryConfiguration) {  
        if (cloudinary.CloudinaryJQuery && jQuery) {
            // cloudinary is attached to the global `jQuery` object
            jQuery.cloudinary.config(configuration.config());
            this.instance = jQuery.cloudinary;
        } else {
            this.instance = new cloudinary.Cloudinary(configuration.config());
        }
        cloudinary.Util.assign(this.instance, cloudinary); // copy namespace to the service instance
    }

    getInstance() {
        return this.instance;
    }

    cloudinaryAttr = function(attr){
        if (attr.match(/cl[A-Z]/)) attr = attr.substring(2);
        return attr.replace(/([a-z])([A-Z])/g,'$1_$2').toLowerCase();
    };

    /**
     * Returns an array of attributes for cloudinary.
     * @function toCloudinaryAttributes
     * @param {Object} source - an object containing attributes
     * @param {(RegExp|string)} [filter] - copy only attributes whose name matches the filter
     * @return {Object} attributes for cloudinary functions
     */
    toCloudinaryAttributes = function (source, filter = undefined) {
        let attributes = {};
        const isNamedNodeMap = source && (source.constructor.name === "NamedNodeMap" || source instanceof NamedNodeMap);
        Object.keys(source).forEach(key => {
            var name = key;
            var value = source[key];
            if (isNamedNodeMap) {
                name = value.name;
                value = value.value;
            }
            if (!filter || filter.exec(name)) {
                attributes[this.cloudinaryAttr(name)] = value;
            }
        });
        return attributes;
    };

}
