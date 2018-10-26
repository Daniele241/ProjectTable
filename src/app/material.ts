import {
    MatButtonModule, 
    MatCheckboxModule,
    MatTableModule,
    MatExpansionModule,
    MatToolbarModule,
    MatIconModule,
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
],
exports: [
    MatButtonModule, 
    MatCheckboxModule,
    MatTableModule,
    MatExpansionModule,
    MatToolbarModule,
    MatIconModule,
],
})
export class MaterialModule {
}