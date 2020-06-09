import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Subject } from 'rxjs';
import { PlanetsService } from './planets.service';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  
  starWarriorsDataReady: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private planetService: PlanetsService) { }

  getStarWarriors(page: number) {
    this.http.get(`https://swapi.dev/api/people?page=${page}`).subscribe((response: any) => {
      this.getStarWarriorPlanetDetails(response);
    });
  }

  getStarWarriorPlanetDetails(response) {
    const homeworldUrls = response.results.map(warrior => warrior.homeworld);
    const uniqueUrls = homeworldUrls.filter((item, key) => homeworldUrls.indexOf(item) == key);
    this.fetchPlanetNames(response, uniqueUrls);
  }

  mapPlanetNames(uniqueUrls, results) {
    let planetNamesUrlsMap = {};
    const planetIds = uniqueUrls.map((url, index) => +uniqueUrls[index].split("planets/")[1].split("/")[0]);
    planetIds.forEach((planetId, index) => {
      if (results[index]) {
        planetNamesUrlsMap[planetId] = results[index].name;
      }
    });
    this.planetService.mapPlanetNamesIds(planetNamesUrlsMap);
  }

  fetchPlanetNames(response, uniqueUrls) {
    const allPlanetIds = uniqueUrls.map((url, index) => +uniqueUrls[index].split("planets/")[1].split("/")[0]);
    const existingIds = _.keys(this.planetService.getPlanetNamesIdsMap()).map(id => +id);
    const newPlanetIds = _.difference(allPlanetIds, existingIds);
    const newPlanetUrls = uniqueUrls.filter((id, index) => {
      const uniqueId = +uniqueUrls[index].split("planets/")[1].split("/")[0];
      return newPlanetIds.includes(uniqueId);
    });
    const homeworlds = newPlanetUrls.map(url => this.http.get(url));
    forkJoin(homeworlds).subscribe((results: any) => {
      this.mapPlanetNames(newPlanetUrls, results);
      this.createStarWarriorsData(response);
    });
    if (newPlanetUrls.length == 0) {
      this.createStarWarriorsData(response);
    }
  }

  createStarWarriorsData(response: any) {
    const idNamesMap = this.planetService.getPlanetNamesIdsMap();
    response.results.forEach(warrior => {
      warrior.homeworldName = idNamesMap[warrior.homeworld.split("planets/")[1].split("/")[0]];
    });
    this.starWarriorsDataReady.next(response);
  }

  searchWarrior(name) {
    return this.http.get(`https://swapi.dev/api/people/?search=${name}`).subscribe((response: any) => {
      this.getStarWarriorPlanetDetails(response);
    });
  }

}
