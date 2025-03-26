import { Component } from '@angular/core';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-submit-button',
  imports: [ButtonModule],
  templateUrl: './submit-button.component.html',
  standalone: true,
  styleUrl: './submit-button.component.scss'
})
export class SubmitButtonComponent {

}
