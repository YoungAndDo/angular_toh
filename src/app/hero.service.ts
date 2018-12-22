import { Injectable } from '@angular/core';
import {HEROES} from "./mock-heroes";
import {Hero} from "./hero";
import {Observable, of, Subject} from "rxjs";
import {delay} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";
import {TodoVo} from "./domain/todo.vo";
import {ResultVo} from "./domain/result.vo";
import {MemberVo} from "./domain/member.vo";

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  refresh = new Subject<number>(); //publisher
  refresh$ = this.refresh.asObservable(); //subscriber

  headers = new HttpHeaders()
    .append('Content-type', 'application/json');

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    // return of(HEROES).pipe(delay(1000));\
    return this.http.get<Hero[]>(`${environment.HOST}/api/heroes`);
  }

  getHero(hero_id: number):Observable<Hero> {
    // return of(HEROES.find(hero => hero.hero_id === hero_id));
    return this.http.get<Hero>(`${environment.HOST}/api/hero/${hero_id}`);
  }

  getTodoList():Observable<TodoVo[]> {
    return this.http.get<TodoVo[]>(`${environment.HOST}/api/todo`);
  }

  getPagedTodoList(start_index:number, page_size:number):Observable<ResultVo>{
    const url = `${environment.HOST}/api/paged_todo?start_index=${start_index}&page_size=${page_size}`
    return this.http.get<ResultVo>(url);
  }

  addTodo(todovo: TodoVo):Observable<TodoVo>{
    return this.http.post<TodoVo>(`${environment.HOST}/api/todo`, todovo, {headers: this.headers});
  }

  modifyTodo(todovo: TodoVo):Observable<TodoVo>{
    return this.http.put<TodoVo>(`${environment.HOST}/api/todo`, todovo, {headers: this.headers});
  }

  removeTodo(todo_id: number): Observable<ResultVo> {
    return this.http.delete<ResultVo>(`${environment.HOST}/api/todo?todo_id=${todo_id}`);
  }

  login(member: MemberVo): Observable<ResultVo> {
    return this.http.post<ResultVo>(`${environment.HOST}/api/login`, member, {headers: this.headers});
  }
}
