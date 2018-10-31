import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
import { TableModel } from '../../../model/table.model';
import { AddEditService } from '../../../service/add-edit.service';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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

export class EditRowComponent implements OnInit, OnDestroy {
  @Input() Mode : string = "";
  public isUpdate: boolean;
  sub: Subscription;

  row: TableModel;

  date = new FormControl(moment());

  plant: string = ""
  competitorCode: string = "";
  competitor: string = "";
  productCode: number;
  product: string = "";
  _date: Date;
  document: number;

  constructor(private httpClient:Http,
              private addEditService: AddEditService,
              private router: Router,
              ) { }

  ngOnInit() {
    if(this.Mode == "edit") {

    }
    /* this.addEditService.eventEmit.subscribe(result => {
      const rowCurrent = result;
      const updateRow = new TableModel(
        rowCurrent.plant,
        rowCurrent.competitorCode,
        rowCurrent.competitor,
        rowCurrent.productCode,
        rowCurrent.product,
        rowCurrent.date,
        rowCurrent.document,
        rowCurrent.id
      )
      this.isUpdate = true;
      this.row = updateRow;
    }) */
    this.updateRow();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  updateRow() {
    this.sub = this.addEditService.eventEmit.subscribe((response) => {
        this.row = response;
        this.isUpdate = true;
    });
  }

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

    this.sub = this.httpClient.post(url, newRow, options)
    .subscribe(
      (error) => console.log(error)
    )
    this.router.navigate(['/table']);
  }
}
