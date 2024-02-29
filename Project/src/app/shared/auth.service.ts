import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { D, T } from '@fullcalendar/core/internal-common';
import { Observable, Timestamp, firstValueFrom, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;
  auth: any;

  constructor(
    private fireauth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.fireauth.authState;
  }

  getCurrentUser() {
    return this.fireauth.currentUser;
  }

  login(email: string, password: string) {
    this.fireauth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userId = userCredential.user ? userCredential.user.uid : null;

        if (userId) {
          this.getAdminInfo(userId).subscribe((adminData) => {
            if (adminData) {
              this.router.navigate(['/admin-page']);
            } else {
              // The user is not an admin, redirect to user-specific page
              this.router.navigate(['/dashboard']);
            }
          });
        } else {
          console.error('User ID is undefined');
          // Handle the case where userCredential.user is undefined
        }
      })
      .catch((err) => {
        console.error('Error during login:', err);
        alert('Something went wrong');
        this.router.navigate(['/login']);
      });
  }

  // Function to check if a user is an admin based on UID
  getAdminInfo(AdminId: string): Observable<any> {
    return this.db.collection('Admin').doc(AdminId).valueChanges();
  }

  getDoctorInfo(doctorId: string): Observable<any> {
    return this.db.collection('Doctors').doc(doctorId).valueChanges();
  }

  register(
    name: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string
  ) {
    return this.fireauth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        userCredential.user?.updateProfile({ displayName: name });

        return this.db.collection('users').doc(userCredential.user?.uid).set({
          Name: name,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: email,
        });
      })
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Registration failed:', error);

        switch (error.code) {
          case 'auth/email-already-in-use':
            console.log(
              'Email is already in use. Please choose another email.'
            );
            break;
          case 'auth/weak-password':
            console.log(
              'Password is too weak. Please choose a stronger password.'
            );
            break;
          case 'auth/invalid-email':
            console.log('Invalid email address. Please enter a valid email.');
            break;
          default:
            console.log('An error occurred during registration.');
        }
      });
  }

  registerDoctor(
    category: string,
    description: string,
    name: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string
  ) {
    return this.fireauth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        userCredential.user?.updateProfile({ displayName: name });

        // Get the last doctor's ID from the collection
        return this.db
          .collection('Doctors', (ref) => ref.orderBy('Id', 'desc').limit(1))
          .get();
      })
      .then((querySnapshot) => {
        let lastId = 0;

        // Subscribe to the querySnapshot observable
        querySnapshot.subscribe((snapshot) => {
          // Check if the snapshot is not empty
          if (!snapshot.empty) {
            lastId = snapshot.docs[0].get('Id');
          }

          // Increment the last ID by 1
          const newId = (++lastId).toString();

          const doctorData = {
            Category: category,
            Description: description,
            Email: email,
            PhoneNumber: phoneNumber,
            LastName: lastName,
            Name: name,
            Id: newId,
          };

          // Add the new doctor document with the updated ID
          return this.db.collection('Doctors').add(doctorData);
        });
      })
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error: { code: any }) => {
        console.error('Doctor registration failed:', error);
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert('Email is already in use. Please choose another email.');
            break;
          case 'auth/weak-password':
            alert('Password is too weak. Please choose a stronger password.');
            break;
          case 'auth/invalid-email':
            alert('Invalid email address. Please enter a valid email.');
            break;
          default:
            alert('An error occurred during doctor registration.');
        }
      });
  }

  disableUser(uid: string): Observable<void> {
    return this.db
      .doc(`Doctors/${uid}`)
      .get()
      .pipe(
        first(),
        switchMap((doc) => {
          if (doc.exists) {
            const currentEnabledState = (doc.data() as any)?.enabled || false;
            const newEnabledState = !currentEnabledState;
            return this.db
              .doc(`Doctors/${uid}`)
              .update({ enabled: newEnabledState });
          } else {
            throw new Error('User not found');
          }
        }),
        catchError((error) => {
          console.error('Error updating user:', error);
          throw error; // Rethrow the error for handling elsewhere if needed
        })
      );
  }

  registerAdmin(name: string, email: string, password: string) {
    return this.fireauth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        userCredential.user?.updateProfile({ displayName: name });

        return this.db.collection('Admin').doc(userCredential.user?.uid).set({
          Name: name,
          Email: email,
        });
      })
      .then(() => {
        this.router.navigate(['/admin-page']);
      })
      .catch((error) => {
        console.error('Admin registration failed:', error);

        switch (error.code) {
          case 'auth/email-already-in-use':
            console.log(
              'Email is already in use. Please choose another email.'
            );
            break;
          case 'auth/weak-password':
            console.log(
              'Password is too weak. Please choose a stronger password.'
            );
            break;
          case 'auth/invalid-email':
            console.log('Invalid email address. Please enter a valid email.');
            break;
          default:
            console.log('An error occurred during Admin registration.');
        }
      });
  }

  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  getUserData(userId: string): Observable<any> {
    return this.db.collection('users').doc(userId).valueChanges();
  }

  getUserName$(): Observable<string | null> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.getUserData(user.uid).pipe(
            switchMap((userData) => {
              if (userData) {
                return of(userData.Name);
              } else {
                return of(null);
              }
            })
          );
        } else {
          return of(null);
        }
      })
    );
  }

  getBookedDoctor$(): Observable<any[]> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.getUserData(user.uid).pipe(
            map((userData) => userData?.BookedDoctors || [])
          );
        } else {
          return of([]);
        }
      })
    );
  }

  async BookedDoctor(
    date: Timestamp<D>,
    doctor: {
      name: string;
      lastName: string;
      category: string;
      email: string;
      phoneNumber: string;
    }
  ): Promise<void> {
    try {
      const user = await this.fireauth.currentUser;

      if (!user) {
        console.error('User not authenticated');
        return;
      }

      const userId = user.uid;

      // Retrieve the existing booked doctors array
      const userData = await firstValueFrom(
        this.db.collection('users').doc(userId).get()
      );
      const bookedDoctorArray = userData.get('BookedDoctors') || [];

      // Check if a doctor is already booked at the same time
      const isAlreadyBooked = bookedDoctorArray.some((bookedDoctor: any) => {
        return bookedDoctor.date.isEqual(date);
      });

      if (isAlreadyBooked) {
        // console.log('Doctor is already booked at the same time');
        return;
      }

      // Append the new booked doctor with the provided timestamp
      const newBookedDoctor = {
        ...doctor,
        date: date,
      };

      bookedDoctorArray.push(newBookedDoctor);

      // Update the user's document with the updated booked doctor array
      await this.db.collection('users').doc(userId).update({
        BookedDoctors: bookedDoctorArray,
      });

      // console.log('Doctor booked successfully');
    } catch (error) {
      // console.error('Error booking doctor:', error);
    }
  }
  async deleteDoctor(Doctors: any): Promise<void> {
    try {
      await this.db.collection('Doctors').doc(Doctors.Id).delete();

      console.log(this.db.collection('Doctors').doc(Doctors.Id));
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  }
}
