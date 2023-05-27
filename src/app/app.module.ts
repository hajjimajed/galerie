import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { NewPostComponent } from './new-post/new-post.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostUpdateComponent } from './post-update/post-update.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './guard/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    NewPostComponent,
    GalleryComponent,
    MyPostsComponent,
    PostDetailsComponent,
    PostUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
