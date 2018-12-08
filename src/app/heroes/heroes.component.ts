import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HEROES} from '../mock-heroes';
import {HeroService} from "../hero.service";
import {NavigationEnd, Router} from "@angular/router"; // named import 방법

@Component({ // 여기가 METADATA 부분, 데코레이트 패턴
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  // hero: Hero = {
  //   hero_id: 1,
  //   name: 'WinStorm'
  // }
  hero: Hero;
  isSpecial = true;
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService, private router: Router) {
    this.hero = new Hero();
    this.hero.hero_id = 1;
    this.hero.name = 'WinStorm';

    this.heroService.getHeroes().subscribe(data => this.heroes = data);

    this.heroService.refresh$.subscribe(hero_id => {
      this.selectedHero = HEROES.find(item => item.hero_id === hero_id)
    })

    //라우터 이벤트 사용
     this.router.events.subscribe(event => {
       if(event instanceof NavigationEnd && event.url === '/heroes'){
         this.selectedHero = null;
       }
     });
  }

  ngOnInit() {
  }

  onSave(e) {
    console.log(e);
    alert('he');
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
    console.log(hero);
  }
}
