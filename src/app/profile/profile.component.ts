import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  validateForm!: FormGroup;
  errorMessage: string = ''; // Variable to hold error message
  updateSuccess: boolean = false;


  constructor(private userService: UserService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private diagRef : MatDialog,
              private datePipe: DatePipe // Inject DatePipe
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      fullname: [null, [Validators.required]],
      niv: [null, [Validators.required]],
      espritId: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      birthDate: [null, [Validators.required]],
    });
    this.getUserById();
  }

  getUserById() {
    this.userService.getUserById().subscribe((res) => {
      console.log(res);
      const formattedBirthDate = this.datePipe.transform(new Date(res.birthDate), 'yyyy-MM-dd');
      this.validateForm.patchValue({
        username: res.username,
        fullname: res.fullname,
        phone: res.phone,
        niv: res.niv,
        espritId: res.espritId,
        birthDate: formattedBirthDate
      });
    });
  }

  updateUser() {
    this.userService.updateUser(this.validateForm.value).subscribe(
      (res) => {
        console.log(res);
        // Reset error message if update is successful
        this.errorMessage = '';
        // Set updateSuccess to true
        this.updateSuccess = true;
      },
      (error) => {
        console.error(error);
        // Set error message based on the error received from the server
        this.errorMessage = 'Username already exists';
      }
    );
  }
  
  
  
}
