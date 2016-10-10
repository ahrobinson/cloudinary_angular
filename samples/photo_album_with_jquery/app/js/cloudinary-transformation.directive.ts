import { Directive, ElementRef } from '@angular/core';

import { Cloudinary } from './cloudinary.service';

@Directive({
  selector: 'cl-transformation'
})
export class CloudinaryTransformationDirective {
  constructor(private el: ElementRef) {
  }

  getAttributes(): NamedNodeMap {
      return this.el.nativeElement.attributes;
  }
}
