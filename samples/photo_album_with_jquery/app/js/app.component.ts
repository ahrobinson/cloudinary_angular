import { Component, OnInit } from '@angular/core';
import { Cloudinary } from './cloudinary.service';

@Component({
    moduleId: module.id,
    selector: '.content',
    template: `
        <div id="logo">
            <!-- This will render the image fetched from a remote HTTP URL using Cloudinary -->
            <img clSrc="http://cloudinary.com/images/logo.png" type="fetch">
        </div>
        <router-outlet></router-outlet>
    `
})
export class AppComponent implements OnInit {

    constructor(private cloudinary: Cloudinary) {

    }
    ngOnInit() {
        this.initializeFavicon();
    }

    /**
     * Hack for having Angular manipulate content in <head> section, which is not bootstrapped by it... 
     */
    initializeFavicon() {
        //Change value of the meta tag
        var links = document.getElementsByTagName('link');
        var length = links.length;
        for (var i = 0; i < length; i++) {
            var link = links[i];
            const clHref = link.getAttribute('clHref');
            if (clHref) {
                const href = this.cloudinary.getInstance().url(clHref, this.cloudinary.toCloudinaryAttributes(link.attributes));
                link.setAttribute('href', href);
            }
        }
    }
}
