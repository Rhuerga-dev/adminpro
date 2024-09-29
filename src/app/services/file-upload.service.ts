import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { UserService } from './user.service';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  public user: User;


  constructor(private userService: UserService) { this.user = userService.user }

  async uploadPhoto(
    file: File,
    type: 'users' | 'doctors' | 'hospitals',
    id: string
  ) {



    try {

      const url = `${base_url}/uploads/${type}/${id}`;

      const formData = new FormData();
      formData.append('image', file);


      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });


      const data = await resp.json();

      if (data.ok) {

        return data.fileName;

      } else {

        console.log(data.msg);
        return false;
      }



    } catch (error) {
      console.log(error);
      return false;
    }

  }
}
