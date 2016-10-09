"use strict";
var router_1 = require('@angular/router');
var photo_list_component_1 = require('./photo-list.component');
var appRoutes = [
    {
        path: 'photos',
        component: photo_list_component_1.PhotoListComponent
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
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map