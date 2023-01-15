import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "registration",
    component: RegistrationComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "detail/:id",
    component: RecipeDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
