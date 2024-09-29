import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmited = false;


  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone) { }


  public registerForm: FormGroup = this.fb.group({
    name: ['Reynaldo', Validators.required],
    email: ['test20@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [true, Validators.required],
  },
    {
      validators: this.matchedPassword('password', 'password2')
    });

  createUser() {

    this.formSubmited = true;

    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    // Realizar posteo
    this.userService.createUser(this.registerForm.value)
      .subscribe(resp => {
        console.log(resp);
        // Navegar al Dashboard
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        });

        this.formSubmited = false;

      }, (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');

        this.formSubmited = false;
      });


  }

  ivalidField(field: string): boolean {

    if (this.registerForm.get(field)?.invalid && this.formSubmited) {

      return true;

    } else {

      return false;
    }
  }

  acceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmited;
  }

  invalidPassword() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;


    if ((pass1 !== pass2) && this.formSubmited) {

      return true;

    } else {

      return false;
    }
  }

  matchedPassword(pass1Name: string, pass2Name: string) {

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({ noEsIgual: true })
      }
    }


  }

}
