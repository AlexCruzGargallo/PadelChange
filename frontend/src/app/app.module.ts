import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { ChatFiltroPipe } from './pipes/chat.pipe';
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
import { AnuncioComponent } from './components/anuncio/anuncio.component';
import { AnuncioinfoComponent } from './components/anuncioinfo/anuncioinfo.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdvertimageComponent } from './components/advertimage/advertimage.component';
import { ModalrateuserComponent } from './components/modalrateuser/modalrateuser.component';
import { ModalconfirmfinishadvertComponent } from './components/modalconfirmfinishadvert/modalconfirmfinishadvert.component';
import { MyadvertsComponent } from './components/myadverts/myadverts.component';
import { MyanuncioComponent } from './components/myanuncio/myanuncio.component';
import { ModalconfirmstartchatComponent } from './components/modalconfirmstartchat/modalconfirmstartchat.component';
import { ModalconfirmdeleteadvertComponent } from './components/modalconfirmdeleteadvert/modalconfirmdeleteadvert.component';
import { PetitionsComponent } from './components/petitions/petitions.component';

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
    ChatFiltroPipe,
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
    AnuncioComponent,
    AnuncioinfoComponent,
    ChatComponent,
    ProfileComponent,
    AdvertimageComponent,
    ModalrateuserComponent,
    ModalconfirmfinishadvertComponent,
    MyadvertsComponent,
    MyanuncioComponent,
    ModalconfirmstartchatComponent,
    ModalconfirmdeleteadvertComponent,
    PetitionsComponent,
  ],
  imports: [
    AppRoutingModule,
    NgImageSliderModule,
    BrowserModule,
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
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
