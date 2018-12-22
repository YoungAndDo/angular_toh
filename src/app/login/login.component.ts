import { Component, OnInit } from '@angular/core';
import {MemberVo} from "../domain/member.vo";
import {HeroService} from "../hero.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  member = new MemberVo();

  constructor(private heroService: HeroService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.heroService.login(this.member)
      .subscribe(body => {
        if(body.result === 0) {
          localStorage.setItem('token', body.data['token']);
          //리다이렉션
          if(localStorage.getItem('redirect_url')) {
            this.router.navigateByUrl(localStorage.getItem('redirect_url'));
          }else {
            this.router.navigateByUrl('/');
          }
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

  isLogin(): boolean {
    const token = localStorage.getItem('token');
    if(!token) return false;

    const decodedPayload = token.split('.')[1];
    const payload = JSON.parse(atob(decodedPayload));
  }
}
