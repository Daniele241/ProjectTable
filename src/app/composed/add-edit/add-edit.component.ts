import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Mode } from '../../../model/mode.model';
import { TableModel } from '../../../model/table.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, NgForm, Validators, FormBuilder } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddEditService } from '../../../service/add-edit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { _MatTabHeaderMixinBase } from '@angular/material/tabs/typings/tab-header';

const moment = _rollupMoment || _moment;
let urlPost = "http://localhost:3000/items";
let urlPut = "http://localhost:3000/items/";
let urlGet = "http://localhost:3000/items/";

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json');

enum textButtonValue {
  ADD = "Save",
  EDIT = "Save"
}
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
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class AddEditComponent implements OnInit {
  @Input() model : TableModel;
  @Input() mode : Mode; 
  buttonText : textButtonValue = textButtonValue.ADD; 

  sub: Subscription;
  signUpForm: FormGroup;
  @ViewChild('f') f : NgForm;
  date = new FormControl(moment());

  constructor(private httpClient:HttpClient,
              private addEditService: AddEditService,
              private router: Router, 
              private fb: FormBuilder,
              private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if(this.mode == Mode.EDIT_MODE) {
      this.addEditService.eventEmit.subscribe(
        (rowCurrent: any) => {
          this.signUpForm = this.fb.group({
            plant : [rowCurrent.plant,Validators.required],
            competitorCode : [rowCurrent.competitorCode,Validators.required],
            competitor : [rowCurrent.competitor,Validators.required],
            productCode : [rowCurrent.productCode,Validators.required],
            product : [rowCurrent.product,Validators.required],
            _date : [rowCurrent.Date,Validators.required],
            document : [rowCurrent.document,Validators.required]
          });
        }
      )
    }
    else {
      this.signUpForm = this.fb.group({
        plant : ["",Validators.required],
        competitorCode : ["",Validators.required],
        competitor : ["",Validators.required],
        productCode : ["",Validators.required],
        product : ["",Validators.required],
        _date : ["",Validators.required],
        document : ["",Validators.required]
    });
    }
  }
  
  ngOnDestroy() {
    //this.sub.unsubscribe();
  }

  onCancel() {
    this.router.navigate(['/table']);
  }

  submitClick() {
    if(this.mode == Mode.EDIT_MODE) {
      console.log(this.model);
        this.onUpdate();
      }
    else 
      this.onPost();
  }

  onUpdate() {
    this.route.params.subscribe(params => {
      const updateRow = new TableModel(
        this.signUpForm.controls['plant'].value,
        this.signUpForm.controls['competitorCode'].value,
        this.signUpForm.controls['competitor'].value,
        this.signUpForm.controls['productCode'].value,
        this.signUpForm.controls['product'].value,
        this.signUpForm.controls['_date'].value,
        this.signUpForm.controls['document'].value,
      )
      this.addEditService.UpdateRow(updateRow);

      this.httpClient.put(urlGet + params.id, updateRow, {headers: headers})
      .subscribe(
        (response: any) => console.log(response)
      )
      this.router.navigate(['/table']);
   });    
  }

  onPost() {
    console.log("sono all'interno della funzione");
    let newRow = new TableModel(
      this.signUpForm.controls['plant'].value,
      this.signUpForm.controls['competitorCode'].value,
      this.signUpForm.controls['competitor'].value,
      this.signUpForm.controls['productCode'].value,
      this.signUpForm.controls['product'].value,
      this.signUpForm.controls['_date'].value,
      this.signUpForm.controls['document'].value,
    )
    this.addEditService.AddRow(newRow);

    this.sub = this.httpClient.post(urlPost, newRow, {headers: headers})
    .subscribe(
      (error) => console.log(error)
    )
    this.router.navigate(['/table']);
  }
}
