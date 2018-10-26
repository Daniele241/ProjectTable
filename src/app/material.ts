import {
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatExpansionModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule
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
        MatMenuModule,
        MatSidenavModule
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatTableModule,
        MatExpansionModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule
    ],
})
export class MaterialModule {
}


