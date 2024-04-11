import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {
  authFormGroup = new FormGroup({     // Контролер групи (всієї форми)
    userName: new FormControl('',     // контролери окремих
      Validators.required),
    userEmail: new FormControl('', [
      Validators.required,
      Validators.email
    ])    // елементів форми
  });

  constructor(private http: HttpClient) { }
  onAuthFormSubmit() {
    console.log(this.authFormGroup.value);
    this.http
      .post("https://localhost:7022/Home/FrontendFrom", this.authFormGroup.value)
      .subscribe(console.log);
  }
  get userName() {
    return this.authFormGroup.get('userName')!;
  }
  get userNameInvalid() {
    return this.userName!.invalid &&
      (this.userName!.dirty || this.userName!.touched);
  }

  get userEmail() {
    return this.authFormGroup.get('userEmail')!;
  }
  get userEmailInvalid() {
    return this.userEmail!.invalid &&
      (this.userEmail!.dirty || this.userEmail!.touched);
  }
}

