import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Cloudinary } from './cloudinary.service';
import { PhotoAlbum } from './photo-album.service'
import { Photo } from './photo'

@Component({
    moduleId: module.id,
    selector: 'photo-list',
    templateUrl: 'photo-upload-jquery.component.html',
    //   styleUrls: ['photo-list.component.css'],
    providers: [PhotoAlbum]
})
export class PhotoUploadJqueryComponent implements OnInit {

    private widget: any;
    private files: any;

    constructor(
        private photoAlbum: PhotoAlbum,
        private route: ActivatedRoute,
        private location: Location,
        private cloudinary: Cloudinary
    ) {
        this.files = [];
    }

    ngOnInit(): void {
        this.initializeUploadWidget();
    }

    updateTitle(title: string) {
        var uploadParams = this.widget.fileupload('option', 'formData');
        uploadParams["context"] = "photo=" + title;
        this.widget.fileupload('option', 'formData', uploadParams);
    }

    getFileProperties(fileProperties: any) {
        // Transforms Javascript Object to an iterable to be used by *ngFor
        if (!fileProperties) {
            return null;
        }
        return Object.keys(fileProperties)
            .map((key) => ({ 'key': key, 'value': fileProperties[key] }));
    }

    initializeUploadWidget(): void {
        const findFile = (fileName: string) => {
            const filteredFileArray = this.files.filter(file => file.name === fileName);
            return filteredFileArray.length > 0 ? filteredFileArray[0] : {};
        }

        const photoUploadComponent = this;
        this.widget = $(".cloudinary_fileupload")
            .unsigned_cloudinary_upload(this.cloudinary.getInstance().config().upload_preset,
            { tags: 'myphotoalbum', context: 'photo=' }, {
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
                if (!file.name) {
                    file.name = name;
                    photoUploadComponent.files.push(file);
                }
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
                file.result = data.result;
                if (!file.name) {
                    file.name = name;
                    photoUploadComponent.files.push(file);
                }
                // $rootScope.photos.push(data.result);
            }).on("cloudinaryfail", function (e, data) {
                var file = findFile(name);
                file.result = data.result;
                if (!file.name) {
                    file.name = name;
                    photoUploadComponent.files.push(file);
                }
            });
    }
}
