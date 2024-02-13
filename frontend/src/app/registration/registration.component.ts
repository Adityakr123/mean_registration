import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import axios from 'axios';
import { RegistrationService } from 'src/app/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user = {
    name: '',
    email: '',
    phoneNumber: '',
    age: null,
    gender: '',
    dob: ''
  };
  allUsers: any[] = []; 

  constructor(private registrationService: RegistrationService) { }

  registerUser() {
    console.log(this.user);
    this.allUsers.push(this.user);
    console.log(this.allUsers);
    this.registrationService.registerUser(this.user)
    
      .subscribe(
        response => {
          console.log('User registered successfully:', response);
          this.getAllUsers();
        },
        error => {
          console.error('Error registering user:', error);

        }
      );
  }
  ngOnInit() {
    // Call getAllUsers() when the component initializes
    this.getAllUsers();
  }
  getAllUsers() {
    this.registrationService.getAllUsers()
      .subscribe(users => {
        console.log('All users:', users);
        this.allUsers = users; // Store all users data
        this.allUsers.reverse()
      }, error => {
        console.error('Error fetching users:', error);
        // Handle error
      });
  }
}