import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteStarWarsComponent } from './favorite-star-wars.component';

describe('FavoriteStarWarsComponent', () => {
  let component: FavoriteStarWarsComponent;
  let fixture: ComponentFixture<FavoriteStarWarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteStarWarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteStarWarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
