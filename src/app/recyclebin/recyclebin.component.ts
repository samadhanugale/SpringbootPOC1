import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-recyclebin',
  templateUrl: './recyclebin.component.html',
  styleUrls: ['./recyclebin.component.css']
})
export class RecyclebinComponent implements OnInit {

  constructor(private userservice: UserService) { }

  usersArray: any[] = [];
  //dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  users: Observable<User[]>;
  user: User = new User();
  deleteMessage = false;
  userlist: any;
  isupdated = false;


  ngOnInit() {
    this.isupdated = false;
    /* this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };    */
    this.userservice.getBinList().subscribe(data => {
      this.users = data;
      this.dtTrigger.next();
    })
  }

  deleteUser(id: number) {
    this.userservice.deleteUserPermanent(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage = true;
          this.userservice.getBinList().subscribe(data => {
            this.users = data
          })
        },
        error => console.log(error));
  }
  restoreUser(id: number) {
    this.userservice.restoreUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage = true;
          this.userservice.getBinList().subscribe(data => {
            this.users = data
          })
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
