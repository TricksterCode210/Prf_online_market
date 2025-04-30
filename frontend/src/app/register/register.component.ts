import {Component, OnInit, signal} from '@angular/core'
import {Button} from "primeng/button";
import {FloatLabel} from "primeng/floatlabel";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {RadioButton} from 'primeng/radiobutton';
import {NgClass, NgForOf, Location} from '@angular/common';
import {Router, RouterModule} from '@angular/router'
import {AuthService} from '../shared/services/auth.service'
import {Toast} from 'primeng/toast'
import {MessageService} from 'primeng/api'

@Component({
  selector: 'app-register',
  imports: [
    Button,
    FloatLabel,
    ReactiveFormsModule,
    InputText,
    RadioButton,
    NgForOf,
    NgClass,
    RouterModule,
    Toast
  ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

    registerForm!: FormGroup;

    userTypes: any[] = [
      {name: 'Seller', value: "elado", label: "Eladó"},
      {name: 'Buyer',  value: "vasarlo", label: "Vásárló"},
    ]

    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService,
      private messageService: MessageService
    ) {

    }

    onSubmit() {
      if(this.registerForm.valid) {
        console.log("Form data: ", this.registerForm.value);
        this.authService.register(this.registerForm.value).subscribe({
          next: (data) => {
            console.log(data)
            this.router.navigateByUrl('/login')
          }, error: (err) => {
            this.messageService.add({severity: 'error', summary: 'Hiba', detail: 'Hiba történt mentésnél', key: 'b1', life: 5000})
            console.log(err)
          }
        })
      }
      else {
        this.messageService.add({severity: 'error', summary: 'Hiba', detail: 'Hibás kitöltés', key: 'b1', life: 5000})
        console.log("Hiba van a formban")
      }
    }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        name: [''],
        username: ['', [Validators.required]],
        address: [''],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        userRole: []
      }, {
        validator: this.mustMatch('password', 'confirmPassword')
      })
    }

    mustMatch(controlName: string, matchingControlName: string) {
      return (formGroup:FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if(matchingControl.errors && matchingControl.errors['mustMatch']){
          return
        }

        if(control.value !== matchingControl.value) {
          matchingControl.setErrors({mustMatch: true})
        } else {
          matchingControl.setErrors(null)
        }
      }
    }

    navigate(to: string){
      this.router.navigateByUrl(to);
    }
}
