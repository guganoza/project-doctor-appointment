import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, Timestamp } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { Doctor } from 'src/app/doctor.model';
import { ActivatedRoute } from '@angular/router';
import { D } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-doctor-details-page',
  templateUrl: './doctor-details-page.component.html',
  styleUrls: ['./doctor-details-page.component.scss'],
})


export class DoctorDetailsPageComponent implements OnInit{
  doctorsCollection: AngularFirestoreCollection<Doctor>;
  Doctors$: Observable<Doctor[]>;
  selectedDoctor: any;
  currentUser: any;
  selected!: Timestamp<D>;
  popUp: boolean = false;
  buttonText: string = 'Book Visit';
  toggle: boolean = false;
  



  constructor(private readonly firestore: AngularFirestore, private auth: AuthService, private route: ActivatedRoute) {
    this.doctorsCollection = this.firestore.collection<Doctor>('Doctors');
    this.Doctors$ = this.doctorsCollection.valueChanges();
  }
  

  logOut() {
    this.auth.logout();
  }

  ngOnInit(): void {
    // Subscribe to the authService's getUserName$ observable
    this.auth.getUserName$().subscribe((Name) => {
      this.currentUser = Name;
    });
    // find selected user
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.Doctors$.subscribe((doctors) => {
          const selectedDoctor = doctors.find((e) => e.Id === id);
          if (selectedDoctor) {
            this.selectedDoctor = selectedDoctor;
          } else {
            console.error(`Doctor with ID ${id} not found`);
          }
        });
      }
    });
  }
  

  openPopUp() {
    this.popUp = true;
    
  }

  closePopUp() {
    this.popUp = false;
  }

  confirmBook(selected: Timestamp<D>) { 
    this.selected = selected;
    this.closePopUp();
    
    const bookedDoctor = {
      date: this.selected,
      doctor: {
        name: this.selectedDoctor.Name,
        lastName: this.selectedDoctor.LastName,
        category: this.selectedDoctor.Category,
        email: this.selectedDoctor.Email,
        phoneNumber: this.selectedDoctor.PhoneNumber
      }
    };
    
    try {
      this.auth.BookedDoctor(bookedDoctor.date, bookedDoctor.doctor);
      this.buttonText = 'Visit Booked';
      this.toggle = true;
    } catch (error) {
      console.error('Error booking doctor:', error);
    }
    
  }
    
}
  
