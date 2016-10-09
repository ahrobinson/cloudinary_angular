import { Component } from '@angular/core';
@Component({
    moduleId: module.id,
    selector: '.content',
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a routerLink="/photos" routerLinkActive="active">Gallery</a>
            <a routerLink="/photos/new" routerLinkActive="active">Upload</a>
        </nav>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    title = 'Hello World!';
}
