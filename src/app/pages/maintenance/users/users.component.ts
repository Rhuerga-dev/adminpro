import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

import { SearchsService } from '../../../services/searchs.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: ``
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalIndex: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public imgSubs?: Subscription
  public indexOff: number = 0;
  public limit: number = 5;
  public loading: boolean = true;


  constructor(private userService: UserService,
              private searchService: SearchsService,
              private modelImageService: ModalImageService) { }


  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }


  ngOnInit(): void {
    this.getUsers();
    this.imgSubs= this.modelImageService.newImage
    .pipe( delay(100) )
    .subscribe( img => this.getUsers()  );
  }



  getUsers() {
    this.loading = true;
    this.userService.getUsers(this.indexOff, this.limit).subscribe(({ totalIndex, users }) => {
      this.totalIndex = totalIndex;
      this.users = users
      this.usersTemp = users
      this.loading = false
    });
  }

  changePage(value: number) {
    this.indexOff += value;

    if (this.indexOff < 0) {
      this.indexOff = 0;
    } else if (this.indexOff >= this.totalIndex) {
      this.indexOff -= value;
    }
    this.getUsers();
  }

  search(term: string) {

    if (term.length === 0) this.users = this.usersTemp;

    this.searchService.search('users', term)
      .subscribe(result => {
        console.log(result)
        this.users = result
      })
  }

  deleteUser(user: User) {

    if (this.userService.uid) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    } else {
      return Swal.fire({
        title: "¿Borrar usuario?",
        text: `Estas a punto de borrar a ${user.name}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si borrarlo"
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(user)
            .subscribe(resp => {
              this.getUsers();
              Swal.fire('Usuario Borrado',
                `${user.name} fue eliminado corectamente`,
                'success'
              );
            });
        }
      });
    }
  }

  changeRole( user: User ){
    this.userService.saveUser( user )
    .subscribe( resp => {
      console.log( resp )
    })
  }

  openModal( user: User){
    console.log(user);
    this.modelImageService.openModal( 'users', user.uid!, user.img);
  }

}
