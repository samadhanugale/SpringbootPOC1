import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { User } from '../User';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private userservice:UserService) { }

  user : User=new User();
  submitted = false;

  ngOnInit() {
    this.submitted=false;
  }

  usersaveform=new FormGroup({
    firstName:new FormControl('' , [Validators.required , Validators.minLength(10) ] ),
    lastName:new FormControl('',[Validators.required,Validators.minLength(10)]),
    address:new FormControl('' , [Validators.required , Validators.minLength(10) ] ),
    pinCode:new FormControl('',[Validators.required,Validators.minLength(10)]),
    dob:new FormControl('' , [Validators.required , Validators.minLength(10) ] ),
    doj:new FormControl('',[Validators.required,Validators.minLength(10)]),
    deleted:new FormControl('' , [Validators.required , Validators.minLength(10) ] ),
   
  });

  saveUser(saveuser){
    this.user=new User();   
    this.user.firstName=this.FirstName.value;
    this.user.lastName=this.LastName.value;
    this.user.address=this.Address.value;
    this.user.pinCode=this.PinCode.value;
    this.user.dob=this.Dob.value;
    this.user.doj=this.Doj.value;
    this.user.deleted=this.Deleted.value;
    this.submitted = true;
    this.save();
  }

  

  save() {
    this.userservice.createUser(this.user)
      .subscribe(data => console.log(data), error => console.log(error));
    this.user = new User();
  }

  get FirstName(){
    return this.usersaveform.get('firstName');
  }

  get LastName(){
    return this.usersaveform.get('lastName');
  }

  get Address(){
    return this.usersaveform.get('address');
  }

  get PinCode(){
    return this.usersaveform.get('pinCode');
  }

  get Dob(){
    return this.usersaveform.get('dob');
  }

  get Doj(){
    return this.usersaveform.get('doj');
  }

  get Deleted(){
    return this.usersaveform.get('deleted');
  }

  addUserForm(){
    this.submitted=false;
    this.usersaveform.reset();
  }
}
