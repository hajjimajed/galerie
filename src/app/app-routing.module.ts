import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { NewPostComponent } from './new-post/new-post.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostUpdateComponent } from './post-update/post-update.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'new-post', component: NewPostComponent, canActivate: [AuthGuard] },
  { path: 'gallery', component: GalleryComponent },
  { path: 'my-posts', component: MyPostsComponent, canActivate: [AuthGuard] },
  { path: 'post/:id', component: PostDetailsComponent },
  { path: 'update-post/:id', component: PostUpdateComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
