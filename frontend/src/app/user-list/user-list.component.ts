import { Component, OnInit ,OnChanges} from '@angular/core';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnChanges {
  allUsers: any[] = [];

  constructor(private registrationService: RegistrationService) { }
  ngOnChanges() {
    console.log("adi");
  }
  ngOnInit(): void {
    this.registrationService.getAllUsers()
      .subscribe(users => {
        this.allUsers = users;
        this.allUsers.reverse();
      });
      
  }
  onUserRegistered():void {
    // this.registrationService.getAllUsers()
    //   .subscribe(users => {
    //     this.allUsers = users;
    //     this.allUsers.reverse();
    //   });
    console.log("adi");
      
  }
}
