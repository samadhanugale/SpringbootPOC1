import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../User';
import { Observable, Subject } from "rxjs";



import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userservice: UserService) { }

  usersArray: any[] = [];
  //dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  users: Observable<User[]>;
  user: User = new User();
  deleteMessage = false;
  userlist: any;
  searchText = '';
  isupdated = false;


  ngOnInit() {
    this.isupdated = false;
    /* this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };    */
    this.userservice.getUserList().subscribe(data => {
      this.users = data;
      this.dtTrigger.next();
    })
  }

  deleteUser(id: number) {
    this.userservice.deleteUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage = true;
          this.userservice.getUserList().subscribe(data => {
            this.users = data
          })
        },
        error => console.log(error));
  }


  updateUser(id: number) {
    this.userservice.getUser(id)
      .subscribe(
        data => {
          this.userlist = data;

          console.log(data);
        },
        error => console.log(error));
  }

  userupdateform = new FormGroup({
    userId: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    address: new FormControl(),
    pinCode: new FormControl(),
    dob: new FormControl(),
    doj: new FormControl(),
    deleted: new FormControl()


  });

  updateUsr(updusr) {
    this.user = new User();
    this.user.userId = this.UserId.value;
    this.user.firstName = this.FirstName.value;
    this.user.lastName = this.LastName.value;
    this.user.address = this.Address.value;
    this.user.pinCode = this.PinCode.value;
    this.user.dob = this.Dob.value;
    this.user.doj = this.Doj.value;
    this.user.deleted = this.Deleted.value;

    console.log(updusr);
    //console.log(this.StudentBranch.value);


    this.userservice.updateUser(this.user.userId, this.user).subscribe(
      data => {
        this.isupdated = true;
        this.userservice.getUserList().subscribe(data => {
          this.users = data
        })
      },
      error => console.log(error));
  }


  get UserId() {
    return this.userupdateform.get('userId');
  }


  get FirstName() {
    return this.userupdateform.get('firstName');
  }

  get LastName() {
    return this.userupdateform.get('lastName');
  }



  get Address() {
    return this.userupdateform.get('address');
  }
  get PinCode() {
    return this.userupdateform.get('pinCode');
  }

  get Dob() {
    return this.userupdateform.get('dob');
  }

  get Doj() {
    return this.userupdateform.get('doj');
  }


  get Deleted() {
    return this.userupdateform.get('deleted');
  }

  changeisUpdate() {
    this.isupdated = false;
  }
}
