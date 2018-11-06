import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableModel } from '../../model/table.model';
import { Subscription, Observable } from 'rxjs';
import { Mode } from '../../model/mode.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEditService } from '../../service/add-edit.service';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

let urlGet = "http://localhost:3000/items/";

@Component({
  selector: 'app-composed',
  templateUrl: './composed.component.html',
  styleUrls: ['./composed.component.scss']
})
export class ComposedComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, 
              private httpClient: HttpClient, 
              private addService: AddEditService,
              private http: Http, private router: Router) { }

  private sub: Subscription;
  mode : Mode;
  tableModel : TableModel = new TableModel(null,null, null, null, null, null, null);
  
  ngOnInit() {
    this.addService.eventEmit.subscribe(
      (response: any) => {
        this.tableModel = response;
      }
    )


    this.sub = this.route.params.subscribe(params => {
      if(!params.id) 
          this.mode = Mode.ADD_MODE;
      else {
        this.mode = Mode.EDIT_MODE;
      /*  this.tableModel = new TableModel(
          "ciao",
          "ciao",
          "ciao",
            12,
          "ciao",
          new Date(),
          12,
        )
        this.mode = Mode.EDIT_MODE ; */


       this.httpClient.get(urlGet + params.id)
       
        .map((response: any) => {
          const res = response;
           let tableModel = new TableModel(
            res.plant, 
            res.competitorCode,
            res.competitor,
            res.productCode,
            res.product,
            res.Date,
            res.document,
            res.id
          );
          
          console.log("Plant: " + res.plant);
          console.log("Competitor code: " + res.competitorCode);
          console.log("competitor: " + res.competitor);
          console.log("productCode: " + res.productCode);
          console.log("product: " + res.product);
          console.log("Date: " + res.Date);
          console.log("document: " + res.document);
          this.addService.UpdateRow(tableModel)

          return tableModel;
        }).subscribe(
          (result: any) => {
            this.tableModel = result;
            console.log("subscribe", result);
            console.log(this.tableModel);
        });
      }
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
