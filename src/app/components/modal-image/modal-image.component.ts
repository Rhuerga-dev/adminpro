import { Component } from '@angular/core';
import { ModalImageService } from '../../services/modal-image.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { FormGroup } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: ``
})
export class ModalImageComponent {

  public profileForm!: FormGroup;
  public user: User;
  public uploadImage!: File;
  public imageTemp: any = null;



  constructor(public modalImageService: ModalImageService,
              private userService: UserService,
              private fileUploadService: FileUploadService) {
    this.user = userService.user
  }


  closeModal() {
    this.imageTemp = null;
    this.modalImageService.closeModal();
  }

  changeImage(event: any) {
    this.uploadImage = event.target.files[0];
    if (!event) {
      this.imageTemp = null;
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(this.uploadImage);

    reader.onloadend = () => {
      this.imageTemp = reader.result;
    };

  }


  upImage() {

    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileUploadService
      .uploadPhoto(this.uploadImage, type, id)
      .then(img => {
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
        this.modalImageService.newImage.emit( img );
        this.modalImageService.closeModal();
      }).catch(err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  }

}
