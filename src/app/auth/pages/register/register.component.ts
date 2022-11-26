import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

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
              private router:Router,
              private authService: AuthService) {}

  Register(){

    console.log(this.miFormulario.value);





    const { name, email, password } = this.miFormulario.value;
    this.authService.register(name,email, password).subscribe((ok) => {

      if(ok === true) {
        this.router.navigateByUrl('/dashboard');
      }else {
        Swal.fire('Error',ok,'error');
      }
    });
  }
}
