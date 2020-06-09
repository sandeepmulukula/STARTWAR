import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StarWarsMainComponent } from './components/star-wars-main/star-wars-main.component';
import { FavoriteStarWarsComponent } from './components/favorite-star-wars/favorite-star-wars.component';


const routes: Routes = [
  { path: 'sw-list', component: StarWarsMainComponent },
  { path: 'favorites', component: FavoriteStarWarsComponent },  
  { path: '', pathMatch: 'full', redirectTo: 'sw-list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
