import { Component } from '@angular/core';

@Component({
  selector: 'app-notpagefound',
  standalone: true,
  imports: [],
  templateUrl: './notpagefound.component.html',
  styleUrls: ['./notpagefound.component.css']
})
export class NotpagefoundComponent {

  year = new Date().getFullYear();
}
