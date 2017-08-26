import { Routes, RouterModule }  from '@angular/router';

import { AppGuardService }       from 'shared/guards/app-guard.service';
import { CONSTANTS }             from 'shared/constant/index';

import { AuthenticationComponent }  from './features/authentication/component/authentication.component';
import { ProjectsListComponent }    from './features/projects-list/component/projects-list.component';
import { LoginComponent }	        from './features/authentication/features/login/component/login.component';
import { SplashComponent }	        from './features/splash/component/splash.component';
import { Page404Component }         from './features/page-404/component/page-404.component';
import { AppComponent }             from './app.component';

const appRoutes: Routes = [
    {
        path: CONSTANTS.ROUTES.ROOT,
        redirectTo: CONSTANTS.ROUTES.SPLASH,
        pathMatch: 'full'
    },
    {
        path: CONSTANTS.ROUTES.SPLASH,
        component: SplashComponent,
    },
    {
        path: CONSTANTS.ROUTES.LOGIN,
        canActivate: [ AppGuardService ],
        children: [{
            path: CONSTANTS.ROUTES.ROOT,
            redirectTo: CONSTANTS.ROUTES.PROJECTS,
            pathMatch: 'full'
        }, {
            path: CONSTANTS.ROUTES.PROJECTS,
            component: ProjectsListComponent,
            children: [{
                path: ':namespace/:project',
                children: [{
                    path: '',
                    redirectTo: CONSTANTS.ROUTES.PROJECT.DASHBOARD,
                    pathMatch: 'full'
                }, {
                    path: CONSTANTS.ROUTES.PROJECT.DASHBOARD,
                    children: []
                }, {
                    path: CONSTANTS.ROUTES.PROJECT.REGISTRY,
                    children: []
                }, {
                    path: CONSTANTS.ROUTES.PROJECT.EDITOR,
                    children: []
                }, {
                    path: CONSTANTS.ROUTES.PROJECT.SETTINGS,
                    children: []
                }]
            }]
        }]
    }, {
        path: CONSTANTS.ROUTES.AUTHENTICATION,
        component: AuthenticationComponent,
        children: [{
            path: CONSTANTS.ROUTES.ROOT,
            redirectTo: CONSTANTS.ROUTES.LOGIN,
            pathMatch: 'full'
        }, {
            path: CONSTANTS.ROUTES.LOGIN,
            component: LoginComponent
        },
        {
            path: CONSTANTS.ROUTES.SIGN_UP,
            children: []
        },
        {
            path: CONSTANTS.ROUTES.PASSWORD_RESET,
            children: []
        }]
    }, {
        path: '**',
        component: Page404Component
    }
];

export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(appRoutes);