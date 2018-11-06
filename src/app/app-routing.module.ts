import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { ComposedComponent } from './composed/composed.component';

const routes: Routes = [
  { path: '', redirectTo: '/composed', pathMatch: 'full' },
  { path: 'table', component: TableComponent },
  { path: 'edit-item/:id', component: ComposedComponent },
  { path: 'add-item', component: ComposedComponent },
  { path: '**', component: TableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
