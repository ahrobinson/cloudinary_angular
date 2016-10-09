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

    getText() {
        return 'walla';
    }
}
