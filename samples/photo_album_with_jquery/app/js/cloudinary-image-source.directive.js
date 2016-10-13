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
var ATTRIBUTE_PREFIX = 'ng-reflect-cl_';
var CloudinaryImageSourceDirective = (function () {
    function CloudinaryImageSourceDirective(el, renderer, cloudinary) {
        this.el = el;
        this.renderer = renderer;
        this.cloudinary = cloudinary;
    }
    CloudinaryImageSourceDirective.prototype.ngAfterViewInit = function () {
        var attrs = this.el.nativeElement.attributes;
        for (var i = attrs.length - 1; i >= 0; i--) {
            if (attrs[i].name.startsWith(ATTRIBUTE_PREFIX)) {
                this.attrName = attrs[i].name.substring(14).toLowerCase();
            }
        }
        var propName = this.attrName;
        var name = this.attrName;
        if (this.attrName === 'href' &&
            toString.call(this.el.nativeElement['href'] === '[object SVGAnimatedString]')) {
            name = 'xlinkHref';
            this.el.nativeElement.setAttribute(name, 'xlink:href');
            propName = null;
        }
        var attrValue = this.el.nativeElement.getAttribute("" + ATTRIBUTE_PREFIX + this.attrName);
        if (!attrValue)
            return;
        attrValue = this.cloudinary.getInstance().url(attrValue, this.cloudinary.toCloudinaryAttributes(this.el.nativeElement.attributes));
        this.el.nativeElement.setAttribute(this.attrName, attrValue);
        // on IE, if "ng:src" directive declaration is used and "src" attribute doesn't exist
        // then calling element.setAttribute('src', 'foo') doesn't do anything, so we need
        // to set the property as well to achieve the desired effect.
        // we use attr[attrName] value since $set can sanitize the url.
        // Check for IE: http://stackoverflow.com/a/32139375/1980950
        var msie = 0; //$document[0].documentMode;
        // if is IE (documentMode contains IE version)
        if (msie && propName) {
            // IE logic here
            this.el.nativeElement[propName] = attrValue;
        }
    };
    ;
    CloudinaryImageSourceDirective = __decorate([
        core_1.Directive({
            selector: '[cl_href]',
            inputs: ['cl_href']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, cloudinary_service_1.Cloudinary])
    ], CloudinaryImageSourceDirective);
    return CloudinaryImageSourceDirective;
}());
exports.CloudinaryImageSourceDirective = CloudinaryImageSourceDirective;
/*

['Src', 'Srcset', 'Href'].forEach(function (attrName) {
  var normalized = 'cl' + attrName;
  attrName = attrName.toLowerCase();
    return {
      priority: 99, // it needs to run after the attributes are interpolated
      link: function (scope, element, attr) {
        var propName = attrName,
          name = attrName;

        if (attrName === 'href' &&
          toString.call(element.prop('href')) === '[object SVGAnimatedString]') {
          name = 'xlinkHref';
          attr.$attr[name] = 'xlink:href';
          propName = null;
        }

        attr.$observe(normalized, function (value) {
          if (!value)
            return;

          value = cloudinary.url(value, toCloudinaryAttributes(element[0].attributes));
          attr.$set(name, value);

          // on IE, if "ng:src" directive declaration is used and "src" attribute doesn't exist
          // then calling element.setAttribute('src', 'foo') doesn't do anything, so we need
          // to set the property as well to achieve the desired effect.
          // we use attr[attrName] value since $set can sanitize the url.
          if ($sniffer.msie && propName) element.prop(propName, attr[name]);
        });
      }
    };
});
*/ 
//# sourceMappingURL=cloudinary-image-source.directive.js.map