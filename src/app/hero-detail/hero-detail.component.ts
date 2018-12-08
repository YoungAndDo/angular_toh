import {Component, Input, OnInit} from '@angular/core';
import {Hero} from "../hero";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../hero.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  //@Input()
  childHero: Hero;

  constructor(private route: ActivatedRoute, private heroService:HeroService) {
    this.route.params.subscribe(param => {
      console.log(param);
      this.heroService.getHero(+param["hero_id"])
        .subscribe(data => {
          this.childHero = data;

          //추출된 파라미터를 부모에게 알린다. (publisher)
          this.heroService.refresh.next(+param["hero_id"]);
        });
    });

  }

  ngOnInit() {
  }

}
