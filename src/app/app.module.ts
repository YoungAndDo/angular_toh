import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import {FormsModule} from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './todo/todo.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { JqueryComponent } from './jquery/jquery.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { MydatePipe } from './mydate.pipe';
import { HighlightDirective } from './highlight.directive';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'todo', component: TodoComponent},
  {path: 'heroes', component: HeroesComponent, children: [
      {path: ':hero_id', component:HeroDetailComponent}
    ]},
  {path: 'jquery', component: JqueryComponent},
  {path: 'login', component: LoginComponent},
  //lazy-loading
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule'}
];

@NgModule({
  declarations: [ /*사용할 컴포넌트 선언 */
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    HomeComponent,
    TodoComponent,
    JqueryComponent,
    MydatePipe,
    HighlightDirective,
    LoginComponent
  ],
  imports: [ /* 외부 모듈 */
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
