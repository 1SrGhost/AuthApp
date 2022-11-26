import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  miFormulario: FormGroup = this.fb.group({
    name:  ['test12324', [Validators.required, Validators.minLength(6)]],
    email: ['test1@tes.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });
  constructor(private fb: FormBuilder,
              private router:Router) {}

  Register(){

    console.log(this.miFormulario.value);

    this.router.navigateByUrl('/dashboard')
  }
}
