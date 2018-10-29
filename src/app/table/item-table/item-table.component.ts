import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TableModel } from '../../../model/table.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/RX';

let headers = new Headers({ 'Content-Type': 'application/json' });
//let options = new RequestOptions({ headers: headers });

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
    'document',
    'edit',
    'delete'
  ];

  dataSource = new MatTableDataSource<TableModel>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getItem();
    this.dataSource.paginator = this.paginator;
  }

  deleteItem(id: TableModel): void {
    this.httpClient.delete("http://localhost:3000/items/" + id.id)
    .subscribe(
      (res: any[]) => {
        //this.dataSource.data.splice(id.id, 1);
        this.getItem();
      }
    )    
  }

  getItem() {
    this.httpClient.get('http://localhost:3000/items')
    //this.httpClient.get('http://localhost:60634/api/competitor') 
    .map((response: any) => {

    const res = response;
    const result : TableModel[] = [];

    for(let item of res) {
      const currentItem = new TableModel(
        item.id,
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

