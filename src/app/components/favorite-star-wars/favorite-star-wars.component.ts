import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-favorite-star-wars',
  templateUrl: './favorite-star-wars.component.html',
  styleUrls: ['./favorite-star-wars.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteStarWarsComponent implements OnInit {

  showTable: boolean = true;
  starWarriors: any;
  public currentPage: number = 0;
  public favoritesCount: number = 0;
  public columnsToDisplay = ['number', 'name', 'birth_year', 'home_world'];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    const favorites = this.dataService.getFavorites();
    this.favoritesCount = this.dataService.getFavoriteCount();
    this.starWarriors = new MatTableDataSource(favorites);
  }

}
