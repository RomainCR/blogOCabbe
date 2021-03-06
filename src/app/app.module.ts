import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RestComponent } from './rest/rest.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { PostFormComponent } from './post-list/post-form/post-form.component';
import { PostListItemComponent } from './post-list/post-list-item/post-list-item.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { PostsService } from './services/posts.service';
import { HttpClientModule } from '@angular/common/http';
import { PostListComponent } from './post-list/post-list.component';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'rest', component: RestComponent },
  { path: 'posts', canActivate:[AuthGuardService], component: PostListComponent },
  { path: 'post/new', canActivate:[AuthGuardService], component: PostFormComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: '**', redirectTo: 'posts' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    PostListItemComponent,
    PostFormComponent,
    HeaderComponent,
    PostListComponent,
    RestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AuthGuardService,
    PostsService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
