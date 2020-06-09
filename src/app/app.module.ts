import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StarWarsListComponent } from './components/star-wars-list/star-wars-list.component';
import { FavoriteStarWarsComponent } from './components/favorite-star-wars/favorite-star-wars.component';
import { StarWarsMainComponent } from './components/star-wars-main/star-wars-main.component';

@NgModule({
  declarations: [
    AppComponent,
    StarWarsListComponent,
    FavoriteStarWarsComponent,
    StarWarsMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
