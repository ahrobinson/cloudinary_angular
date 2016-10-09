import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photo-list.component';

const appRoutes: Routes = [
    {
        path: 'photos',
        component: PhotoListComponent
    },
    // {
    //     path: 'photos/new',
    //     component: DashboardComponent
    // },
    {
        path: '',
        redirectTo: '/photos',
        pathMatch: 'full'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
