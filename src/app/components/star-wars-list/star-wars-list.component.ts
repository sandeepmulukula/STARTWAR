import { Component, OnInit, ViewChild, ChangeDetectionStrategy, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTable, MatTableDataSource } from '@angular/material';
import _ from 'lodash';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-star-wars-list',
  templateUrl: './star-wars-list.component.html',
  styleUrls: ['./star-wars-list.component.css']
})
export class StarWarsListComponent implements OnInit {
  
  @Input() public starWarriors: any;
  @Input() public currentPage: number = 0;
  @Input() public totalCount: number = 0;
  @Input() public favoritesCount: number = 0;
  @Input() public canFavorite: boolean;
  @Input() public columnsToDisplay;
  @ViewChild('starWarriorsTable', null) starWarriorsTable: MatTable<any>;

  constructor(private dataService: DataService) { }

  ngOnInit() {}

  public getNext(event) {
    this.dataService.pageChangedEvent.next(event.pageIndex + 1);
  }

  public drop(event: CdkDragDrop<string[]>) {
    const prevIndex = this.starWarriors.data.findIndex((d) => d === event.item.data);
    moveItemInArray(this.starWarriors.data, prevIndex, event.currentIndex);
    this.starWarriors.data = [...this.starWarriors.data];
    this.dataService.setFavoritesOrder(this.starWarriors.data);
  }

  public toggleFavorite(index, isFavorite) {
    const data = { index, isFavorite };
    this.dataService.toggleFavoritesEvent.next(data);
  }

}
