import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { LanguageService } from 'src/app/translate/language.service';

@Component({
  selector: 'app-multi-header',
  templateUrl: './multi-header.component.html',
  styleUrls: ['./multi-header.component.scss'],
})
export class MultiHeaderComponent implements OnInit {
  currentUser!: string | null;
  constructor(
    private auth: AuthService,
    private languageService: LanguageService
  ) {}
  DropDown: boolean = false;
  default: string = 'en';
  change: string = 'ge';

  logOut() {
    this.auth.logout();
    window.location.href = '/login';
  }

  ngOnInit(): void {
    // Get Current username for welcome
    this.auth.getUserName$().subscribe((Name) => {
      this.currentUser = Name;
    });
  }

  DropDownClick() {
    this.DropDown = !this.DropDown;
  }

  changeLanguage() {
    this.default = this.default === 'en' ? 'ge' : 'en';

    this.languageService.switchLanguage(this.default);
  }
}
