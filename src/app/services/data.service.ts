import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private pageWiseData: any[] = [];
  private favoriteCount: number = 0;
  private favorites: any[] = [];
  public pageChangedEvent: Subject<number> = new Subject<number>();
  public toggleFavoritesEvent: Subject<any> = new Subject<any>();

  constructor() { }

  setPageWiseData(pageNumber, data) {
    const isPresent = this.pageWiseData.some(el => el.pageNumber === pageNumber);
    if (!isPresent) {
      this.pageWiseData.push({ ...data, pageNumber });
    }
  }

  getPageWiseData() {
    return this.pageWiseData;
  }

  setFavorites(pageNumber, index, isFavorite) {
    this.pageWiseData.find(el => el.pageNumber === pageNumber).results[index].favorite = isFavorite;
    this.favoriteCount = isFavorite ? ++this.favoriteCount : --this.favoriteCount;
  }

  getFavorites() {
    const allPageResults = this.pageWiseData.map(pageData => pageData.results);
    const allResults = _.flattenDeep(allPageResults);
    this.favorites = allResults.filter(data => data.favorite);
    return this.favorites;
  }

  setFavoritesOrder(data) {
    this.favorites = data;
  }

  getFavoriteCount() {
    return this.favoriteCount;
  }

}
