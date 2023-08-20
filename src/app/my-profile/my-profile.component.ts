import { Component } from '@angular/core';
import { DbService } from '../db.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  standalone: true,
  imports: [CommonModule, MatExpansionModule, ReactiveFormsModule]
})
export class MyProfileComponent {

  constructor(private dbService: DbService, private fb: FormBuilder) { }

  edit = false;
  panelOpenState = false;
  userDetails: any = {}
  addressForm!: FormGroup;
  updateAddress: boolean = false;
  ngOnInit() {
    this.dbService.getUserProfileData().subscribe({
      next: (res: any) => {
        this.userDetails = res.data.userDetails;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    });

    this.addressForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      Hno: ['', [Validators.required]],
      street: ['', [Validators.required, Validators.maxLength(20)]],
      town: ['', [Validators.required, Validators.maxLength(20)]],
      pincode: ['', [Validators.required, Validators.maxLength(6)]]
    });
  }

  editToggle() {
    this.edit = !this.edit;
  }

  isInvalid(controlName: string): boolean {
    const control = this.addressForm.get(controlName);
    return !!(control?.invalid && control?.touched);
  }

  formSubmit() {

    this.addressForm.markAllAsTouched();
  }
}
