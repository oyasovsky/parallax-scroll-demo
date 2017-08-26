import { NgModule }                         from '@angular/core';
import { APP_BASE_HREF }                    from '@angular/common';
import { BrowserModule } 		    	    from '@angular/platform-browser';
import { HttpModule } 				        from '@angular/http';
import { FormsModule }   			        from '@angular/forms';
import { RouterModule, Router }    		    from '@angular/router';
import { FlexLayoutModule }                 from '@angular/flex-layout';

import { Ng2Webstorage }                    from 'ngx-webstorage';

import { APP_PROVIDERS }                    from './app.providers';
import { AppComponent }                     from './app.component';
import { appRoutingProviders, routing }     from './app.routing';

import { ConfigService }                    from 'common/services/config/config.service';
import { AppInitializer }                   from './app.initializer';

import { DirectivesModule }                 from 'common/directives/directives.module';
import { HeaderModule }			            from 'shared/features/header/header.module';
import { FooterModule }		        	    from 'shared/features/footer/footer.module';

import { AuthenticationComponent }          from './features/authentication/component/authentication.component';
import { ProjectsListComponent }            from './features/projects-list/component/projects-list.component';
import { LoginComponent }		            from './features/authentication/features/login/component/login.component';
import { SplashComponent }		            from './features/splash/component/splash.component';
import { Page404Component }                 from './features/page-404/component/page-404.component';
import { Parallax, ParallaxConfig }         from 'ng2-parallax/commonjs';
        // either (for Systemjs)
         //ParallaxConfig } from 'ng2-parallax/system';
        // or, if webpack is finding it fine:
         //ParallaxConfig } from 'ng2-parallax/commonjs';
         
@NgModule({
    declarations: [
        AppComponent,
        Parallax,
        SplashComponent,
        LoginComponent,
        Page404Component,
        AuthenticationComponent,
        ProjectsListComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule,
        Ng2Webstorage,
        DirectivesModule,
        HeaderModule,
        FooterModule,
        routing,
        FlexLayoutModule    ],
    providers: [
        APP_PROVIDERS,
        appRoutingProviders,
        AppInitializer,
    ],
    entryComponents: [ LoginComponent ],
    bootstrap: [ AppComponent ]
})

export class AppModule {}