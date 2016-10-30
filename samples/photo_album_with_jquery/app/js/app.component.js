"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var cloudinary_service_1 = require('./cloudinary.service');
var AppComponent = (function () {
    function AppComponent(cloudinary) {
        this.cloudinary = cloudinary;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.initializeFavicon();
    };
    /**
     * Hack for having Angular manipulate content in <head> section, which is not bootstrapped by it...
     */
    AppComponent.prototype.initializeFavicon = function () {
        //Change value of the meta tag
        var links = document.getElementsByTagName('link');
        var length = links.length;
        for (var i = 0; i < length; i++) {
            var link = links[i];
            var clHref = link.getAttribute('cl-href');
            if (clHref) {
                var href = this.cloudinary.getInstance().url(clHref, this.cloudinary.toCloudinaryAttributes(link.attributes));
                link.setAttribute('href', href);
            }
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: '.content',
            template: "\n        <div id=\"logo\">\n            <!-- This will render the image fetched from a remote HTTP URL using Cloudinary -->\n            <cl-image [attr.public-id]=\"'http://cloudinary.com/images/logo.png'\" type=\"fetch\"></cl-image>\n        </div>\n        <router-outlet></router-outlet>\n    "
        }), 
        __metadata('design:paramtypes', [cloudinary_service_1.Cloudinary])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map