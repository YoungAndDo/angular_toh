import { Injectable } from '@angular/core';
import {HEROES} from "./mock-heroes";
import {Hero} from "./hero";
import {Observable, of, Subject} from "rxjs";
import {delay} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  refresh = new Subject<number>(); //publisher
  refresh$ = this.refresh.asObservable(); //subscriber

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    // return of(HEROES).pipe(delay(1000));\
    return this.http.get<Hero[]>(`${environment.HOST}/api/heroes`);
  }

  getHero(hero_id: number):Observable<Hero> {
    // return of(HEROES.find(hero => hero.hero_id === hero_id));
    return this.http.get<Hero>(`${environment.HOST}/api/hero/${hero_id}`);
  }
}
