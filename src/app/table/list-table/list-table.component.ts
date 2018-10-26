import { Component, OnInit } from '@angular/core';
import { TableModel } from '../../../model/table.model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/RX'

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss']
})
export class ListTableComponent implements OnInit {

  arrItem: TableModel[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getItem();
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

    result.push(currentItem); } return result; }) .subscribe(
    (result: TableModel[]) => {
    console.log(result); this.arrItem = result; } );
    }
}