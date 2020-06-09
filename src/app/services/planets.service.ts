import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  private planetIdsNamesMap: any = {};

  constructor() { }

  mapPlanetNamesIds(map) {
    _.forEach(map, (value, key) => {
      if (!this.planetIdsNamesMap[key]) {
        this.planetIdsNamesMap[key] = value;
      }
    });
  }

  getPlanetNamesIdsMap() {
    return this.planetIdsNamesMap;
  }
}
