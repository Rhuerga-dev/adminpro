import { Component, OnInit } from '@angular/core';
import { HospitalsService } from '../../services/hospitals.service';
import { Hospital } from '../../models/hospital.model';
import { ModalImageService } from '../../services/modal-image.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: ``
})
export class HospitalsComponent implements OnInit{

  public loading: boolean = true;
  public hospitals: Hospital[] = [];
  public hospitalsTemp: Hospital[] = [];

  constructor( private hospitalService: HospitalsService,
               private modelImageService: ModalImageService) {}
  
  
  ngOnInit(): void {
  this.getHospitals();
  }



  getHospitals(){
    this.loading = true;
   this.hospitalService.getHospitals().subscribe(  hospitals  => {
    console.log(hospitals)
    this.hospitals = hospitals
    this.hospitalsTemp = hospitals
    this.loading = false;
   });
  }

  openModal( hospital: Hospital){
    console.log(hospital)
    this.modelImageService.openModal( 'hospitals', hospital._id!, hospital.img);
  }
}
