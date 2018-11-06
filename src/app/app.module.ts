import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { TableComponent } from './table/table.component';
import { ItemTableComponent } from './table/item-table/item-table.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ComposedComponent } from './composed/composed.component';
import { AddEditComponent } from './composed/add-edit/add-edit.component';
import { AddEditService } from '../service/add-edit.service';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ItemTableComponent,
    SidenavComponent,
    ComposedComponent,
    AddEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [AddEditService],
  bootstrap: [AppComponent]
})
export class AppModule { }
