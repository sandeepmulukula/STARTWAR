import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { DataService } from 'src/app/services/data.service';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-star-wars-main',
  templateUrl: './star-wars-main.component.html',
  styleUrls: ['./star-wars-main.component.css']
})
export class StarWarsMainComponent implements OnInit, OnDestroy {

  public showTable: boolean = false;
  public starWarriors: any;
  public currentPage: number = 0;
  public totalCount: number = 0;
  public favoritesCount: number = 0;
  public canFavorite: boolean = true;
  public columnsToDisplay = ['favorite', 'name', 'birth_year', 'home_world'];
  nameSearchFormControl = new FormControl('');
  
  private pageChangeSubscription: Subscription;
  private toggleFavoriteSubscription: Subscription;

  constructor(private restService: RestService, private dataService: DataService) { }

  ngOnInit() {
    this.fetchStarWarriors(1);
    this.pageChangeSubscription = this.dataService.pageChangedEvent.subscribe((number) => this.fetchStarWarriors(number));
    this.toggleFavoriteSubscription = this.dataService.toggleFavoritesEvent.subscribe((data) => this.toggleFavorites(data));
  }

  ngOnDestroy() {
    this.pageChangeSubscription.unsubscribe();
    this.toggleFavoriteSubscription.unsubscribe();
  }

  private fetchStarWarriors(pageNumber): void {
    this.showTable = false;
    const pageWiseData = this.dataService.getPageWiseData();
    const pageData = pageWiseData.find(data => data.pageNumber === pageNumber);
    if (pageData) {
      this.createTable(pageData, pageNumber);
    } else {
      this.restService.getStarWarriors(pageNumber);
      this.restService.starWarriorsDataReady.subscribe((response: any) => {
        this.dataService.setPageWiseData(pageNumber, response);
        this.createTable(response, pageNumber);
      });
    }
  }

  private createTable(response, pageNumber) {
    this.currentPage = pageNumber - 1;
    this.totalCount = response.count;
    this.starWarriors = new MatTableDataSource(response.results);
    this.favoritesCount = this.dataService.getFavoriteCount();
    this.showTable = true;
  }

  private toggleFavorites({index, isFavorite}) {
    this.starWarriors.data[index].favorite = isFavorite;
    this.starWarriors.data.filter(warrior => warrior.favorite).length;
    this.dataService.setFavorites(this.currentPage + 1, index, isFavorite);
    this.favoritesCount = this.dataService.getFavoriteCount();
  }

  private search() {
    this.restService.searchWarrior(this.nameSearchFormControl.value);
  }

}
