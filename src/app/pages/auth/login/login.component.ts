import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;                    // {1}
  private formSubmitAttempt: boolean; // {2}

  constructor(
    private fb: FormBuilder,         // {3}
    private authService: AuthService // {4}
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({     // {5}
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { // {6}
  return (
    (!this.form.get(field).valid && this.form.get(field).touched) ||
    (this.form.get(field).untouched && this.formSubmitAttempt)
  );
}

onSubmit() {
  console.log(this.form.value);
  if (this.form.valid) {
    this.authService.login(this.form.value); // {7}
  }
  this.formSubmitAttempt = true;             // {8}
}

}
