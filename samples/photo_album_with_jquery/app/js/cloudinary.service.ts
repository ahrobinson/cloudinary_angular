import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { CloudinaryConfiguration } from './cloudinary-configuration.service';

declare var cloudinary: any;
declare var jQuery: any;

@Injectable()
export class Cloudinary {
    nativeInstance: any;
    constructor(private configuration: CloudinaryConfiguration) {
        if (cloudinary.CloudinaryJQuery && jQuery) {
            // cloudinary is attached to the global `jQuery` object
            jQuery.cloudinary.config(configuration.config());
            this.nativeInstance = jQuery.cloudinary;
        } else {
            this.nativeInstance = new cloudinary.Cloudinary(configuration.config());
        }
    }

    url(...parameters): string {
        return this.nativeInstance.url(...parameters);
    }

    uploadPreset(): string {
        return this.nativeInstance.config().upload_preset;
    }

    responsive(url, img, options): void {
        this.nativeInstance.Util.setData(img, "src", url);
        this.nativeInstance.cloudinary_update(img, options);
        this.nativeInstance.responsive(options, false);

    }

    cloudinaryAttr = function (attr): string {
        if (attr.match(/cl[A-Z]/)) attr = attr.substring(2);
        return attr.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    };

    /**
     * Returns an array of attributes for cloudinary.
     * @function toCloudinaryAttributes
     * @param {Object} source - an object containing attributes
     * @param {(RegExp|string)} [filter] - copy only attributes whose name matches the filter
     * @return {Object} attributes for cloudinary functions
     */
    toCloudinaryAttributes = function (source, filter = undefined): any {
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
