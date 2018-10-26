import { Component, OnInit } from '@angular/core';
import { TableModel } from '../../../model/table.model';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss']
})
export class ListTableComponent implements OnInit {

  arrItem: TableModel[] = [];

  constructor() { }

  ngOnInit() {

  }
}