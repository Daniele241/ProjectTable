import {
    MatButtonModule, 
    MatCheckboxModule,
    MatTableModule,
    MatExpansionModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
} from '@angular/material';

import { NgModule } from '@angular/core';
@NgModule({
imports: [
    MatButtonModule, 
    MatCheckboxModule,
    MatTableModule,
    MatExpansionModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule
],
exports: [
    MatButtonModule, 
    MatCheckboxModule,
    MatTableModule,
    MatExpansionModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule
],
})
export class MaterialModule {
}