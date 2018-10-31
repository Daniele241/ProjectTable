import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TableModel } from '../../../model/table.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/RX';
import { SelectionModel } from '@angular/cdk/collections';
import { AddEditService } from '../../../service/add-edit.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/RX';

let headers = new Headers({ 'Content-Type': 'application/json' });
//let options = new RequestOptions({ headers: headers });

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.scss']
})
export class ItemTableComponent implements OnInit, OnDestroy {

  sub: Subscription;
  selection = new SelectionModel<TableModel>(true, [])

  displayedColumns: string[] = [
    'plant',
    'competitorCode',
    'competitor',
    'productCode',
    'product',
    'date',
    'document',
    'edit',
    'delete'
  ];

  dataSource = new MatTableDataSource<TableModel>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, 
              private httpClient: HttpClient, 
              private addEditService: AddEditService) { }

  ngOnInit() {
    this.getItem();
    this.dataSource.paginator = this.paginator;
    /* this.addEditService.eventEmit.subscribe(
      (post: TableModel) => this.dataSource.data.push(post)
    ) */
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  

  updateElement(id: TableModel) {
    //this.addEditService.UpdateRow(id)
    this.router.navigate(['/edit-item', id.id]);
  }

  deleteItem(id: TableModel): void {
    /* this.httpClient.delete("http://localhost:3000/items/" + id.id)
    .subscribe(
      (res: any[]) => {
        res = this.dataSource.data = this.dataSource.data.filter(item => item.id !== id.id)
        console.log(res);
      }
    )  */

     /* this.httpClient.delete("http://localhost:3000/items/" + id.id)
    .subscribe(
      (res: any[]) => {
        this.getItem();
      }
    )  */

    if(confirm("Confermi di volere eliminare la riga con id " +id.id + "?")) {
      this.sub = this.httpClient.delete("http://localhost:3000/items/" + id.id)
      .subscribe(
        (res: any[]) => {
          const allElement = this.dataSource.data;
          console.log(allElement);
          this.dataSource.data.splice(this.dataSource.data.indexOf(id), 1);
          console.log(allElement);
          res = allElement;
          this.dataSource.data = res;
        }
      ) 
    }
  }

  getItem() {
    this.sub = this.httpClient.get('http://localhost:3000/items')
    .map((response: any) => {

    const res = response;
    const result : TableModel[] = [];

    for(let item of res) {
      const currentItem = new TableModel(
        item.plant, 
        item.competitorCode,
        item.competitor,
        item.productCode,
        item.product,
        item.Date,
        item.document,
        item.id
      );
      result.push(currentItem); 
    } 
    return result; 
    }) 
    .subscribe(
      (result: TableModel[]) => {
        this.dataSource.data = result; 
        console.log(this.dataSource); 
      } 
    );
  } 
}

