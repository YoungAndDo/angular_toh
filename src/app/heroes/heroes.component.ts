import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HEROES} from '../mock-heroes'; // named import 방법

@Component({ // 여기가 METADATA 부분, 데코레이트 패턴
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  // hero: Hero = {
  //   id: 1,
  //   name: 'WinStorm'
  // }
  hero: Hero;
  isSpecial = true;
  heroes = HEROES;
  selectedHero: Hero;

  constructor() {
    this.hero = new Hero();
    this.hero.id = 1;
    this.hero.name = 'WinStorm';
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
