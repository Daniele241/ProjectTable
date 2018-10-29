import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { EditRowComponent } from './table/edit-row/edit-row.component';

const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'table', component: TableComponent },
  { path: 'edit-table', component: EditRowComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
