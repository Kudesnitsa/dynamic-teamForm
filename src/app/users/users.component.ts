import {Component, OnInit} from '@angular/core';
import {User} from './User';
import {Validators, FormGroup, FormArray, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  count: number;
  users = <User>[];
  singUpForm: FormGroup;
  max = 10;
  min = 1;
  step = 1;
  flag = false;
  fb: FormBuilder;

  constructor() {
    this.users = null;
    this.count = 1;
    this.fb = new FormBuilder();
    this.singUpForm = this.fb.group({
      users: this.fb.array([
        this.initUser()
      ])
    });
  }

  initUser() {
    return this.fb.group({
      name: this.fb.control('fsdfa', Validators.required),
      email: this.fb.control('dsd1231@gmail.com', [Validators.required, Validators.email]),
      phone: this.fb.control('0509076042', [
        Validators.required,
        Validators.pattern('[0-9]{10}')
      ])
    });
  }

  ngOnInit() {
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

  addUsers() {
    (<FormArray>this.singUpForm.get('users')).push(
      this.initUser()
    );
  }

  cellUsers() {
    const arrayLen = this.singUpForm.controls['users'].value.length;
    if (arrayLen < this.count) {
      for (let i = arrayLen; i < this.count; i += 1) {
        this.addUsers();
      }
    } else {
      for (let i = arrayLen; i >= this.count; i -= 1) {
        this.removeUsers(i);
      }
    }
  }

  removeUsers(i: number): void {
    if (this.count !== 1) {
      this.count -= 1;
      (<FormArray>this.singUpForm.controls['users']).removeAt(i);
    }
  }

  save(data) {
    this.flag = true;
    this.users = data.value['users'];
  }
}
