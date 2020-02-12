import {NgModule} from '@angular/core';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatDividerModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSidenavModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatStepperModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatGridListModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ]
})


export class MaterialModule {
}
