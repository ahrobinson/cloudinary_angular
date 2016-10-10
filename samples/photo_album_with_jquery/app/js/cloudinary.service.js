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
var cloudinary_configuration_service_1 = require('./cloudinary-configuration.service');
var Cloudinary = (function () {
    function Cloudinary(configuration) {
        this.configuration = configuration;
        this.cloudinaryAttr = function (attr) {
            if (attr.match(/cl[A-Z]/))
                attr = attr.substring(2);
            return attr.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
        };
        /**
         * Returns an array of attributes for cloudinary.
         * @function toCloudinaryAttributes
         * @param {Object} source - an object containing attributes
         * @param {(RegExp|string)} [filter] - copy only attributes whose name matches the filter
         * @return {Object} attributes for cloudinary functions
         */
        this.toCloudinaryAttributes = function (source, filter) {
            var _this = this;
            if (filter === void 0) { filter = undefined; }
            var attributes = {};
            var isNamedNodeMap = source && (source.constructor.name === "NamedNodeMap" || source instanceof NamedNodeMap);
            Object.keys(source).forEach(function (key) {
                var name = key;
                var value = source[key];
                if (isNamedNodeMap) {
                    name = value.name;
                    value = value.value;
                }
                if (!filter || filter.exec(name)) {
                    attributes[_this.cloudinaryAttr(name)] = value;
                }
            });
            return attributes;
        };
        if (cloudinary.CloudinaryJQuery && jQuery) {
            // cloudinary is attached to the global `jQuery` object
            jQuery.cloudinary.config(configuration.config());
            this.instance = jQuery.cloudinary;
        }
        else {
            this.instance = new cloudinary.Cloudinary(configuration.config());
        }
        cloudinary.Util.assign(this.instance, cloudinary); // copy namespace to the service instance
    }
    Cloudinary.prototype.getInstance = function () {
        return this.instance;
    };
    Cloudinary = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [cloudinary_configuration_service_1.CloudinaryConfiguration])
    ], Cloudinary);
    return Cloudinary;
}());
exports.Cloudinary = Cloudinary;
//# sourceMappingURL=cloudinary.service.js.map