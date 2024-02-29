import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Doctor } from 'src/app/doctor.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
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
    window.location.href = '/login';
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

  onDeleteDoctor(Id: string): void {
    // Query to find the document with the specified doctorName
    const query = this.firestore.collection('Doctors', (ref) =>
      ref.where('Id', '==', Id)
    );

    // Execute the query
    query.get().subscribe((querySnapshot) => {
      if (querySnapshot.size > 0) {
        // Delete the first document found in the query result
        const firstDocument = querySnapshot.docs[0];
        firstDocument.ref
          .delete()
          .then(() => {
            console.log('Document successfully deleted!');
          })
          .catch((error) => {
            console.error('Error removing document: ', error);
          });
      } else {
        console.log('No document found with the specified criteria.');
      }
    });
  }

  disableDoctor(doctorId: string) {
    this.auth.disableUser(doctorId).subscribe(
      () => {
        console.log('Doctor toggled successfully.');
      },
      (error) => {
        console.error('Error toggling doctor:', error);
      }
    );
  }
}
