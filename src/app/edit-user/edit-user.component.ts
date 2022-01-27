import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { User } from '../User';
import { UserService } from '../user.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  temp: string | null;
  id:number;
  formVal!: FormGroup;
  users: Observable<User[]>;
  user : User=new User();
  dtTrigger: Subject<any>= new Subject();
  submitted = false;
  newDob:any;
  newDoj:any;

  constructor(private router: Router,private formBuilder: FormBuilder,private userservice:UserService,private active: ActivatedRoute) {
    this.temp = active.snapshot.paramMap.get("id"); //You will get id in string
    if (this.temp != null) {
      this.id = parseInt(this.temp);
    }
   }
  

  
  ngOnInit() {
    this.formVal = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      address: [''],
      pinCode: [''],
      dob: [''],
      doj: [''],
    });
    this.submitted=false;

    console.log("Got ID => "+this.id);
    this.userservice.getUser(this.id).subscribe((data) =>{
      console.log(data);
      this.onEdit(data);
      //this.user = data;
    })
    
  }
  onEdit(a:any){
    this.formVal.controls['firstName'].setValue(a.firstName);
    this.formVal.controls['lastName'].setValue(a.lastName);
    this.formVal.controls['address'].setValue(a.address);
    this.formVal.controls['pinCode'].setValue(a.pinCode);
    this.newDob = formatDate(a.dob,'yyyy-MM-dd',"en-US");
    this.newDoj = formatDate(a.doj,'yyyy-MM-dd',"en-US");
    this.formVal.controls['dob'].setValue(this.newDob);
    this.formVal.controls['doj'].setValue(this.newDoj);
  }

  update() {
    this.user.firstName=this.formVal.value.firstName;
    this.user.lastName=this.formVal.value.lastName;
    this.user.address=this.formVal.value.address;
    this.user.pinCode=this.formVal.value.pinCode;
    this.user.dob=this.formVal.value.dob;
    this.user.doj=this.formVal.value.doj;
    this.userservice.updateUser(this.id,this.user).subscribe(res=>{
      console.log("Responce update => "+res);
    })
    this.router.navigate(['/view-user'])
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
