import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'adminpro';

  constructor ( private router: Router, 
                private userService: UserService, 
                private ngZone: NgZone){}

  ngOnInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "646991237896-urlup2se3iqo8tfo5gcerph1047cgdl6.apps.googleusercontent.com",
      // Mantener a this. apuntado a la clase loginForm
      callback: (response: any) => this.handleCredentialResponse(response)
        
    });
    google.accounts.id.prompt();
  }

  handleCredentialResponse(response: any) {
    //console.log("Encoded JWT ID token: " + response.credential);
    this.userService.loginGoogle(response.credential)
      .subscribe(resp => {
        // Navegar al Dashboard
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        });
      });
    }
}
