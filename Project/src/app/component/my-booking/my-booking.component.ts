import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { LanguageService } from 'src/app/translate/language.service';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.scss']
})
export class MyBookingComponent implements OnInit {
  currentUser!: string | null;
  userData: any;
  BookedDoctors: any[] = [];
  BookedDoctorDate: any[] = [];
  SeachedBookedDoctorDate: any[] = [];
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  dateRange: boolean = true;
  filteredDoctors: any[] = [];

  constructor(private auth: AuthService, private languageService: LanguageService) {}
  

  logOut() {
    this.auth.logout();
  }

  ngOnInit(): void {
    // Get Current username for welcome
    this.auth.getUserName$().subscribe((Name) => {
      this.currentUser = Name;
    });

    this.fetchBookedDoctor();
  }

  fetchBookedDoctor() {
    this.auth.getBookedDoctor$().subscribe((BookedDoctors) => {
      this.BookedDoctors = BookedDoctors || [];
      this.BookedDoctorDate = [];

      this.BookedDoctors.forEach((doctor: any) => {
        const formattedDate = doctor.date.toDate().toDateString();
        this.BookedDoctorDate.push(formattedDate);
      });
    });
  }

  fetchFilteredDoctors(startDate: Date, endDate: Date) {
    const start = startDate.getTime();
    const end = endDate.getTime();
  
    return this.BookedDoctors.filter(doctor => {
      const doctorTimestamp = doctor.date.toDate().getTime();
      
      return doctorTimestamp >= start && doctorTimestamp <= end;
    });
  }
  
  reset() {
    this.filteredDoctors.length = 0;
    this.fetchBookedDoctor();
  }

  logDates() {
    const startDate = this.range.get('start')?.value ?? new Date();
    const endDate = this.range.get('end')?.value ?? new Date();

    this.filteredDoctors = this.fetchFilteredDoctors(startDate, endDate);

    if(this.filteredDoctors.length == 0) {
      this.BookedDoctors = [];
    }

    this.SeachedBookedDoctorDate = this.filteredDoctors.map((doctor: any) => {
      // Convert Timestamp to formatted date string
      return doctor.date.toDate().toDateString();
    });
  }
}
