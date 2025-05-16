import {Component, OnInit, signal} from '@angular/core'
import {Button} from 'primeng/button'
import {FloatLabel} from 'primeng/floatlabel'
import {InputText} from 'primeng/inputtext'
import {NgForOf} from '@angular/common'
import {RadioButton} from 'primeng/radiobutton'
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms'
import {AuthService} from '../shared/services/auth.service'
import {Router} from '@angular/router'
import {TextareaModule} from 'primeng/textarea'
import {InputNumberModule} from 'primeng/inputnumber'
import {FileUpload} from 'primeng/fileupload'
import {ProductService} from '../shared/services/product.service'
import {Card} from 'primeng/card'
import {Product} from '../shared/model/Product'
import {Image} from 'primeng/image'
import {Toast} from 'primeng/toast'
import {ConfirmationService, MessageService} from 'primeng/api'
import {ConfirmDialog} from 'primeng/confirmdialog'

@Component({
  selector: 'app-sell',
  imports: [
    Button,
    FloatLabel,
    InputText,
    NgForOf,
    RadioButton,
    ReactiveFormsModule,
    TextareaModule,
    InputNumberModule,
    FileUpload,
    Card,
    Image,
    Toast,
    ConfirmDialog
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.scss',
  standalone:true
})
export class SellComponent implements OnInit
{
  productForm!: FormGroup;
  products = signal<Product[]>([]);
  selectedFile!: File | null;   // <-- Hozzáadva: hogy elmentsd a kiválasztott képet

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  )
  {
  }

  ngOnInit()
  {
    this.productForm = this.formBuilder.group({
      name: [''],
      description: [''],
      price: [''],
      imageSrc: [null],
      username: ['']
    });

    this.authService.loggedInUser().subscribe(user => {
      if (user) {
        this.productForm.patchValue({ username: user.username });
        this.productService.getAllProductsByUser(user.username).subscribe({
          next: (data) => {
            this.products.set(data)
          }, error: (err) => {
            console.log(err)
          }
        })
      }
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];  // csak az elsőt vesszük
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('username', this.productForm.get('username')?.value);
      formData.append('state', 'ACTIVE');

      if (this.selectedFile) {
        formData.append('imageSrc', this.selectedFile);
      }

      this.productService.sell(formData).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigateByUrl('/buy');
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      console.log("Nem valid a form!");
    }
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }

  delete(id: string){
    this.productService.deleteProduct(id).subscribe({
      next: (data) => {
        this.messageService.add({severity: 'success', summary: 'Sikeres művelet', detail: 'Sikeresen kitörölte a terméket', key: 'b1', life: 5000})
        this.products.update(products => products.filter(p => p._id !== id))
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Hiba', detail: 'Sikertelen törlés', key: 'b1', life: 5000})
      }
    })
  }

  confirmDelete(event: Event, id: string){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Biztosan törli a terméket',
      header: 'Törlés',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Mégsem',
      rejectButtonProps: {
        label: 'Mégsem',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Törlés',
        severity: 'danger',
      },

      accept: () => {
        this.delete(id)
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Mégsem', detail: 'Megszakította a törlési folyamatot' });
      },
    });
  }
}
