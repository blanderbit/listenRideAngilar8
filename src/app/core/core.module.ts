import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiService} from './services/api.service';
import {HttpClientModule} from '@angular/common/http';
import {ApiRidesBikeService} from '@api/api-rides-bike/api-rides-bike.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    ApiService,
    ApiRidesBikeService
  ]
})
export class CoreModule {
}
