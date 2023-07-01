import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {StyleManagerService} from "./style-manager.service";
import { AppComponent } from './app.component';
import {GALLERY_CONFIG, GalleryModule} from 'ng-gallery';
import { InputComponent } from './input/input.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AuthentComponent } from './authent/authent.component';
import { AdminComponent } from './admin/admin.component';
import { PromptComponent } from './prompt/prompt.component';
import { PaymentComponent } from './payment/payment.component';
import { SignatureComponent } from './signature/signature.component';
import { HourglassComponent } from './hourglass/hourglass.component';

import { SplashComponent } from './splash/splash.component';
import { ScannerComponent } from './scanner/scanner.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {WebcamModule} from "ngx-webcam";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "@abacritt/angularx-social-login";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatSliderModule} from "@angular/material/slider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {GooglePayButtonModule} from "@google-pay/button-angular";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import { SafePipe } from './safe.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AskForPaymentComponent} from "./ask-for-payment/ask-for-payment.component";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatStepperModule} from "@angular/material/stepper";
import {GalleryComponent} from "./gallery/gallery.component";
import {environment} from "../environments/environment";
import { ShowroomComponent } from './showroom/showroom.component';
import {DeviceService} from "./device.service";
import { ServiceWorkerModule } from '@angular/service-worker';
import { AboutComponent } from './about/about.component';
import { TranslatePipe } from './translate.pipe';
import { GenlinkComponent } from './genlink/genlink.component';
import {MatListModule} from "@angular/material/list";
import {UploadFileComponent} from "./upload-file/upload-file.component";
import {FaqLinkComponent} from "./faq-link/faq-link.component";
import { ShareComponent } from './share/share.component';


const routes: Routes = [
  { path: 'gallery', component: GalleryComponent},
  { path: 'about', component: AboutComponent},
  { path: 'share', component: ShareComponent},
  { path: 'faqs', component: FaqsComponent},
  { path: '', component: GalleryComponent},
  { path: 'admin', component: AdminComponent,pathMatch: 'full' },
]

export const GOOGLE_CLIENT_ID="167299914377-p8vuf2f6npqnigl5kpqrh34cqjd81eko.apps.googleusercontent.com"
const config: SocketIoConfig = { url: environment.server, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    FaqsComponent,
    AuthentComponent,
    AdminComponent,
    PromptComponent,
    PaymentComponent,
    SignatureComponent,
    HourglassComponent,
    GalleryComponent,
    SplashComponent,
    ScannerComponent,
    AskForPaymentComponent,
    SafePipe,
    ShowroomComponent,
    AboutComponent,
    TranslatePipe,
    GenlinkComponent,
    UploadFileComponent,
    FaqLinkComponent,
    ShareComponent
  ],
  imports: [
    BrowserModule,
    MatProgressSpinnerModule,
    WebcamModule,
      ReactiveFormsModule,
    ClipboardModule,
    SocialLoginModule,
    MatCardModule,
    MatFormFieldModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatSliderModule,
    MatProgressBarModule,
    GooglePayButtonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatExpansionModule,
    GalleryModule,
    MatCheckboxModule,
    RouterOutlet,
    SocketIoModule.forRoot(config),
    RouterModule.forRoot(routes),
    MatStepperModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatListModule,
  ],
  providers: [
    DeviceService,StyleManagerService,TranslatePipe,
    {provide: MAT_DIALOG_DATA, useValue: {hasBackdrop: false}},
    {provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(GOOGLE_CLIENT_ID),
          }
        ],
      } as SocialAuthServiceConfig},
    {
      provide: GALLERY_CONFIG,
      useValue: {
        dots: true,
        imageSize: 'cover'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
