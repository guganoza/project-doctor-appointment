import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  name : string = '';
  lastName : string = '';
  phoneNumber : string = '';
  email : string = '';
  password : string = '';
  

  constructor(private auth : AuthService) {}

  ngOnInit(): void {

  }

  register() {
    if(this.name == '') {
      alert('please enter name');
      return;
    }

    if(this.lastName == '') {
      alert('please enter lastname');
      return;
    }

    if(this.email == '') {
      alert('please enter eamil');
      return;
    }
    
    if(this.phoneNumber == '') {
      alert('please enter phone number');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.register(this.name, this.lastName, this.phoneNumber, this.email, this.password);
    
    this.name = '';
    this.lastName = '';
    this.phoneNumber = '';
    this.email = '';
    this.password = '';
  }
  
}
