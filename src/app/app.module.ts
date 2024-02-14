import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { CurriculumComponent } from './pages/curriculum/curriculum.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProjectDetailComponent } from './dialog/project-detail/project-detail.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslatePipe } from './pipes/translate.pipe';
import { TranslateService } from './services/translate.service';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    HomeComponent,
    CurriculumComponent,
    ProjectDetailComponent,
    TranslatePipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  entryComponents: [ProjectDetailComponent],
  providers: [TranslateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
