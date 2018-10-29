import {Component, OnInit} from '@angular/core';
import {User} from './User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  count: number;
  users: User[];
  max = 10;
  min = 1;
  step = 1;
  thumbLabel = false;

  constructor() {
    this.count = 1;
    this.users = [];
  }

  ngOnInit() {
    this.cellUsers();
  }

  setCount(e): void {
    let value = e.value;
    if (value) {
      value = +value;
      if (value > 0 && value <= 10) {
        this.count = value;
        this.cellUsers();
      }
    }
  }

  cellUsers() {
    this.users = this.users.splice(0, this.count);
    for (let i = this.users.length; i < this.count; i += 1) {
      this.users.push(new User());
    }
    console.log(this.users);
  }


}
