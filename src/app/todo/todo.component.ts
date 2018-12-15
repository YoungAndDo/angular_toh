import { Component, OnInit } from '@angular/core';
import {TodoVo} from "../domain/todo.vo";
import {HeroService} from "../hero.service";
import {PageVo} from "../domain/page.vo";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoList: TodoVo[];
  newTodo = new TodoVo();
  tempMap = new Map<number, TodoVo>();

  page:PageVo;

  constructor(private heroService: HeroService) {
    this.page = new PageVo(1,5,0);
  }

  ngOnInit() {
    this.getPageTodoList();
  }

  getPageTodoList() {
    const start_index = this.page.pageSize * (this.page.pageIndex - 1);
    this.heroService.getPagedTodoList(start_index, this.page.pageSize)
      .subscribe(body => {
        console.log('getTodoList', body);
        this.todoList = body.data;
        this.page.totalCount = body.total;
      });
  }

  getTodoList() {
    this.heroService.getTodoList()
      .subscribe(body => {
        console.log(body);
        this.todoList = body;
      })
  }

  addTodo() {
    // newTodo를 직렬화를 해야 할 것인가?
    // newTodo가 todo만 할당이 되고 나머지는 undefined인데, 어떻게 될 것인가
    this.heroService.addTodo(this.newTodo)
      .subscribe(body => {
        this.todoList.unshift(body);
      });
  }

  save(todo: TodoVo){
    todo.isEdited = true;
    this.tempMap.set(todo.todo_id, {...todo});
  }

  restore(todo: TodoVo){
    Object.assign(todo, this.tempMap.get(todo.todo_id));
    todo.isEdited = false;
  }

  modify(todo: TodoVo){
    this.heroService.modifyTodo(todo)
      .subscribe(body => {
        Object.assign(todo, body);
      })
    todo.isEdited = false;
  }

  remove(todo: TodoVo){
    if(confirm('삭제하시겠습니까?')) {
      this.heroService.removeTodo(todo.todo_id)
        .subscribe(body=>{
          console.log(body);
          if(body.result === 0){
            this.todoList.splice(this.todoList.findIndex(t => t.todo_id === todo.todo_id), 1);
          }
        });
    }
  }

  pageChanged(event: any){
    console.log(event);
    this.page.pageIndex = event;
    this.getPageTodoList();
  }
}
