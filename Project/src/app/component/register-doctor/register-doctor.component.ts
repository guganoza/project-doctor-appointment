import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.scss'],
})
export class RegisterDoctorComponent {
  public passcode: string = '';
  category: string = '';
  description: string = '';
  name: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: string = '';

  constructor(private auth: AuthService) {
    this.passcode = '';
  }

  ngOnInit(): void {}

  registerDoctor() {
    if (this.passcode === '12345678') {
      if (this.category == '') {
        alert('Please enter category');
        return;
      }

      if (this.description == '') {
        alert('Please enter description');
        return;
      }

      if (this.name == '') {
        alert('please enter name');
        return;
      }

      if (this.password == '') {
        alert('Please enter password');
        return;
      }

      if (this.email == '') {
        alert('Please enter email');
        return;
      }

      if (this.phoneNumber == '') {
        alert('Please enter Phone Number');
        return;
      }
    }

    this.auth.registerDoctor(
      this.category,
      this.description,
      this.name,
      this.lastName,
      this.email,
      this.phoneNumber,
      this.password
    );
  }
}
