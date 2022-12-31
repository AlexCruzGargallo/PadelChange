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
import { StarsComponent } from './components/stars/stars.component';
import { PalacreateComponent } from './components/palacreate/palacreate.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { HttpClientModule } from '@angular/common/http';
import { AnunciosgeneralComponent } from './components/anunciosgeneral/anunciosgeneral.component';
import { ModalcreateadvertComponent } from './components/modalcreateadvert/modalcreateadvert.component';
import { ModalpleaseloginComponent } from './components/modalpleaselogin/modalpleaselogin.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalsearchracketComponent } from './components/modalsearchracket/modalsearchracket.component';
import { ModalRacketPipePipe } from './pipes/modal-racket-pipe.pipe';
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
    StarsComponent,
    PalacreateComponent,
    EditprofileComponent,
    AnunciosgeneralComponent,
    ModalcreateadvertComponent,
    ModalpleaseloginComponent,
    FooterComponent,
    ModalsearchracketComponent,
    ModalRacketPipePipe,
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
    ImageCropperModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
