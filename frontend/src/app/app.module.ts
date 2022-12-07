import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PalasgeneralComponent } from './components/palasgeneral/palasgeneral.component';
import { PalaComponent } from './components/pala/pala.component';
import { PalainfoComponent } from './components/palainfo/palainfo.component';
import { RacketFiltroPipe } from './pipes/racket-filtro.pipe';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalrateracketComponent } from './components/modalrateracket/modalrateracket.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    PalasgeneralComponent,
    PalaComponent,
    PalainfoComponent,
    RacketFiltroPipe,
    ModalrateracketComponent,
  ],
  entryComponents: [ModalrateracketComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    NgxStarRatingModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
