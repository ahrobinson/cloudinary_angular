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
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var cloudinary_service_1 = require('./cloudinary.service');
var photo_album_service_1 = require('./photo-album.service');
var PhotoUploadJqueryComponent = (function () {
    function PhotoUploadJqueryComponent(photoAlbum, route, location, cloudinary) {
        this.photoAlbum = photoAlbum;
        this.route = route;
        this.location = location;
        this.cloudinary = cloudinary;
        this.files = [];
    }
    PhotoUploadJqueryComponent.prototype.ngOnInit = function () {
        this.initializeUploadWidget();
    };
    PhotoUploadJqueryComponent.prototype.updateTitle = function (title) {
        var uploadParams = this.widget.fileupload('option', 'formData');
        uploadParams["context"] = "photo=" + title;
        this.widget.fileupload('option', 'formData', uploadParams);
    };
    PhotoUploadJqueryComponent.prototype.getFileProperties = function (fileProperties) {
        // Transforms Javascript Object to an iterable to be used by *ngFor
        if (!fileProperties) {
            return null;
        }
        return Object.keys(fileProperties)
            .map(function (key) { return ({ 'key': key, 'value': fileProperties[key] }); });
    };
    PhotoUploadJqueryComponent.prototype.initializeUploadWidget = function () {
        var _this = this;
        var findFile = function (fileName) {
            var filteredFileArray = _this.files.filter(function (file) { return file.name === fileName; });
            return filteredFileArray.length > 0 ? filteredFileArray[0] : {};
        };
        var photoUploadComponent = this;
        this.widget = $(".cloudinary_fileupload")
            .unsigned_cloudinary_upload(this.cloudinary.getInstance().config().upload_preset, { tags: 'myphotoalbum', context: 'photo=' }, {
            // Uncomment the following lines to enable client side image resizing and validation.
            // Make sure cloudinary/processing is included the js file
            //disableImageResize: false,
            //imageMaxWidth: 800,
            //imageMaxHeight: 600,
            //acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp|ico)$/i,
            //maxFileSize: 20000000, // 20MB
            dropZone: "#direct_upload_jquery",
            start: function (e) {
                this.status = "Starting upload...";
                photoUploadComponent.files = [];
            },
            fail: function (e, data) {
                this.status = "Upload failed";
            }
        })
            .on("cloudinaryprogress", function (e, data) {
            var name = data.files[0].name;
            var file = findFile(name);
            file.progress = Math.round((data.loaded * 100.0) / data.total);
            file.status = "Uploading... " + file.progress + "%";
            photoUploadComponent.files.push(file);
        })
            .on("cloudinaryprogressall", function (e, data) {
            this.progress = Math.round((data.loaded * 100.0) / data.total);
            this.status = "Uploading... " + this.progress + "%";
        })
            .on("cloudinarydone", function (e, data) {
            // $rootScope.photos = $rootScope.photos || [];
            data.result.context = { custom: { photo: this.title } };
            this.result = data.result;
            var name = data.files[0].name;
            var file = findFile(name);
            file.name = name;
            file.result = data.result;
            photoUploadComponent.files.push(file);
            // $rootScope.photos.push(data.result);
        }).on("cloudinaryfail", function (e, data) {
            var file = findFile(name);
            file.name = name;
            file.result = data.result;
            photoUploadComponent.files.push(file);
        });
    };
    PhotoUploadJqueryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'photo-list',
            templateUrl: 'photo-upload-jquery.component.html',
            //   styleUrls: ['photo-list.component.css'],
            providers: [photo_album_service_1.PhotoAlbum]
        }), 
        __metadata('design:paramtypes', [photo_album_service_1.PhotoAlbum, router_1.ActivatedRoute, common_1.Location, cloudinary_service_1.Cloudinary])
    ], PhotoUploadJqueryComponent);
    return PhotoUploadJqueryComponent;
}());
exports.PhotoUploadJqueryComponent = PhotoUploadJqueryComponent;
//# sourceMappingURL=photo-upload-jquery.component.js.map