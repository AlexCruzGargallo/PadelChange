import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PalasgeneralComponent } from './components/palasgeneral/palasgeneral.component';
import { PalainfoComponent } from './components/palainfo/palainfo.component';
import { PalacreateComponent } from './components/palacreate/palacreate.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { AnunciosgeneralComponent } from './components/anunciosgeneral/anunciosgeneral.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'rackets', component: PalasgeneralComponent },
  { path: 'racket/:id', component: PalainfoComponent },
  { path: 'rackets/create', component: PalacreateComponent },
  { path: 'profile/edit', component: EditprofileComponent },
  { path: 'adverts', component: AnunciosgeneralComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
