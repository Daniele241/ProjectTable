import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModel } from '../../../model/table.model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/RX'
import { MatTableDataSource, MatPaginator } from '@angular/material';


const ELEMENT_DATA: TableModel[] = [
  new TableModel("asd","asdf","sdf",9,"sdf",new Date(),7),
  new TableModel("asd","asdf","sdf",9,"sdf",new Date(),7),
  new TableModel("asd","asdf","sdf",9,"sdf",new Date(),7),
  new TableModel("asd","asdf","sdf",9,"sdf",new Date(),7),
  new TableModel("asd","asdf","sdf",9,"sdf",new Date(),7),
  new TableModel("asd","asdf","sdf",9,"sdf",new Date(),7),
  new TableModel("asd","asdf","sdf",9,"sdf",new Date(),7),
  new TableModel("asd","asdf","sdf",9,"sdf",new Date(),7),
];

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss']
})
export class ListTableComponent implements OnInit {

  arrTableItem: TableModel[] = [new TableModel("asd","asdf","sdf",9,"sdf",new Date(),7)];

  

  
  // dataSource = new MatTableDataSource<TableModel>(ELEMENT_DATA);
  dataSource = ELEMENT_DATA;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getItem();
    // this.dataSource.paginator = this.paginator;

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
  // this.dataSource.data = result; 
} );
  } 
}