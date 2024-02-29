import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss'],
})
export class AdminRegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  registerAdmin() {
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

    this.auth.registerAdmin(this.name, this.email, this.password);
  }
}
