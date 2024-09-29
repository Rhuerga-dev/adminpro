import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  public profileForm!: FormGroup;
  public user: User;
  public uploadImage!: File;
  public imageTemp: any = null;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService) {
    this.user = userService.user
  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });

  }

  updateProfile() {

    this.userService.updateProfile(this.profileForm.value)
      .subscribe(resp => {
        console.log(resp)
        const { name, email } = this.profileForm.value;
        this.user.name = name;
        this.user.email = email;


        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      }, (err) => {
        console.log(err)
        this.profileForm.patchValue({ email: this.user.email });
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  changeImage(event: any){

      this.uploadImage = event.target.files[0];

    if (!event) {
      this.imageTemp = null;
      return;
    }
  
    const reader = new FileReader();
    
    reader.readAsDataURL( this.uploadImage );
    
    reader.onloadend = () => {
      this.imageTemp = reader.result;
    };
    
  }
                      
  upImage() {
    
    this.fileUploadService
      .uploadPhoto(this.uploadImage, 'users', this.user.uid!)
      .then(img => {
        this.user.img = img ;
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch(err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  }


}
