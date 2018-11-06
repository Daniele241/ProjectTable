import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/RX';
import { Subscription } from 'rxjs/RX';

import { TableModel } from '../../../model/table.model';

let urlGet = "http://localhost:3000/items";
let urlDelete = "http://localhost:3000/items/";

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
              ) { }

  ngOnInit() {   
    this.dataSource.paginator = this.paginator;
    this.getItem();
  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }
  
  updateElement(id: TableModel) {
    this.router.navigate(['/edit-item', id.id]);
  }

  deleteItem(id: TableModel) {
    if(confirm("Confermi di volere eliminare la riga con id " +id.id + "?")) {
      this.sub = this.httpClient.delete(urlDelete + id.id)
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
    this.sub = this.httpClient.get(urlGet)
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

