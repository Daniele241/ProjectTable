import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { ComposedPageComponent } from './composed-page/composed-page.component';

const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'table', component: TableComponent },
  { path: 'edit-item/:id', component: ComposedPageComponent },
  { path: 'add-item', component: ComposedPageComponent },
  { path: '**', component: TableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
