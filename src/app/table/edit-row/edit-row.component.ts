import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
import { TableModel } from '../../../model/table.model';
import { AddEditService } from '../../../service/add-edit.service';
import { HttpClient } from '@angular/common/http';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Route, Router } from '@angular/router';

const moment = _rollupMoment || _moment;
let url = "http://localhost:3000/items";
let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: headers });

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-edit-row',
  templateUrl: './edit-row.component.html',
  styleUrls: ['./edit-row.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class EditRowComponent implements OnInit {

  date = new FormControl(moment());

  plant: string;
  competitorCode: string;
  competitor: string;
  productCode: number;
  product: string;
  _date: Date;
  document: number;

  constructor(private httpClient:Http,
              private addEditService: AddEditService,
              private router: Router
              ) { }

  ngOnInit() {}

  onCancel() {
    this.router.navigate(['/table']);
  }

  onPost() {
    console.log("sono all'interno della funzione");
    let newRow = new TableModel(
      this.plant,
      this.competitorCode,
      this.competitor,
      this.productCode,
      this.product,
      this._date,
      this.document
    )
    this.addEditService.AddRow(newRow);

    this.httpClient.post(url, newRow, options)
    .subscribe(
      (error) => console.log(error)
    )
    this.router.navigate(['/table']);
  }
}
