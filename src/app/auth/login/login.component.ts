import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { AppComponent } from '../../app.component';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  AfterViewInit {

  @ViewChild('googleBtn') googleBtn?: ElementRef;

  public formSubmited = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]

  },
    {
      Validators
    });

  constructor(private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private appComponent: AppComponent,
    private ngZone: NgZone) {

  }
  
  

  ngAfterViewInit(): void {

    this.renderGoogleButton();

  }

  renderGoogleButton(){
    
    this.appComponent.googleInit();

    google.accounts.id.renderButton(
      this.googleBtn?.nativeElement,
      { theme: "outline", size: "large" }
    );
  }

  login() {
    this.formSubmited = true;

    this.userService.login(this.loginForm.value)
      .subscribe(resp => {
        // Guardar email si esta activo remember me
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }

        // Navegar al Dashboard
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        });

        this.formSubmited = false;

      }, (err) => {
        console.log(err);

        let errorMsg = '';

        if (err.error?.errors) {
          const emailError = err.error.errors.email?.msg || '';
          const passwordError = err.error.errors.password?.msg || '';

          // Usar <br> para los saltos de línea
          const errorMessages = [emailError, passwordError].filter(msg => msg);
          errorMsg = errorMessages.length > 0 ? errorMessages.join('<br>') : 'Error desconocido';
        } else {
          errorMsg = err.error?.msg || 'Ha ocurrido un error inesperado';
        }

        // Si sucede un error
        Swal.fire('Error', errorMsg, 'error');

        this.formSubmited = false;
      });
  }

}




