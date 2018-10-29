import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModel } from '../../../model/table.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/RX'


@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.scss']
})
export class ItemTableComponent implements OnInit {

  displayedColumns: string[] = [
    'plant',
    'competitorCode',
    'competitor',
    'productCode',
    'product',
    'date',
    'document'
  ];
  arrTableItem: TableModel[] = [];
  
  dataSource = new MatTableDataSource<TableModel>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getItem();
    this.dataSource.paginator = this.paginator;
  }

  getItem() {
    this.httpClient.get('http://localhost:3000/items') 
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
    );
    result.push(currentItem); 
  } 
  return result; }) .subscribe(
  (result: TableModel[]) => {
  this.dataSource.data = result; 
  console.log(this.dataSource); 
} );
  } 
}

