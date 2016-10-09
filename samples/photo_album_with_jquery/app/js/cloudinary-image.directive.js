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
var CloudinaryImageDirective = (function () {
    function CloudinaryImageDirective(el, renderer, cloudinary) {
        this.cloudinary = cloudinary;
        renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
        renderer.setText(el.nativeElement, cloudinary.getText());
        console.log(cloudinary.getInstance().url('myphotoalbum', { format: 'json', type: 'list' }));
    }
    CloudinaryImageDirective = __decorate([
        core_1.Directive({
            selector: 'cl-image'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, cloudinary_service_1.Cloudinary])
    ], CloudinaryImageDirective);
    return CloudinaryImageDirective;
}());
exports.CloudinaryImageDirective = CloudinaryImageDirective;
//# sourceMappingURL=cloudinary-image.directive.js.map