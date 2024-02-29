import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Doctor } from 'src/app/doctor.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  Doctors$!: Observable<Doctor[]>;
  currentUser: any;
  searchName: string = '';
  searchLastName: string = '';
  searchCategory: string = '';
  filteredDoctors$!: Observable<Doctor[]>;
  selectedDoctor: Doctor | undefined;

  constructor(
    private auth: AuthService,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  logOut() {
    this.auth.logout();
  }

  ngOnInit(): void {
    // Subscribe to the authService's getUserName$ observable
    this.auth.getUserName$().subscribe((Name) => {
      this.currentUser = Name;
    });

    // Fetch the list of doctors from the "Doctors" collection in Firebase
    this.Doctors$ = this.firestore.collection<Doctor>('Doctors').valueChanges();

    // Create a new observable for the filtered doctors based on the search parameters
    this.filteredDoctors$ = this.Doctors$.pipe(
      map((doctors) =>
        doctors.filter(
          (doctor) =>
            (!this.searchName ||
              doctor.Name.toLowerCase().includes(
                this.searchName.toLowerCase()
              )) &&
            (!this.searchLastName ||
              doctor.LastName.toLowerCase().includes(
                this.searchLastName.toLowerCase()
              )) &&
            (!this.searchCategory ||
              doctor.Category.toLowerCase().includes(
                this.searchCategory.toLowerCase()
              ))
        )
      )
    );
  }

  searchDoctors() {
    // Update the filteredDoctors$ observable based on the search parameters
    this.filteredDoctors$ = this.Doctors$.pipe(
      map((doctors) =>
        doctors.filter(
          (doctor) =>
            (!this.searchName ||
              (doctor.Name &&
                doctor.Name.toLowerCase().includes(
                  this.searchName.toLowerCase()
                ))) &&
            (!this.searchLastName ||
              (doctor.LastName &&
                doctor.LastName.toLowerCase().includes(
                  this.searchLastName.toLowerCase()
                ))) &&
            (!this.searchCategory ||
              (doctor.Category &&
                doctor.Category.toLowerCase().includes(
                  this.searchCategory.toLowerCase()
                )))
        )
      )
    );
  }

  goToPage(pageName: string, id: string): void {
    this.filteredDoctors$.subscribe((doctors) => {
      // Check if the selected doctor is enabled before navigating to the details page
      const selectedDoctor = doctors.find((doctor) => doctor.Id === id);

      if (selectedDoctor && selectedDoctor.enabled) {
        this.router.navigate([`${pageName}`, id]);
      } else {
        console.log('Doctor not found or disabled. Cannot view details.');
        // You can display a message or handle the case as needed.
      }
    });
  }
}
