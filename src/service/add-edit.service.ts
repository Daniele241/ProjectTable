import { Injectable, EventEmitter } from '@angular/core';
import { TableModel } from '../model/table.model';

@Injectable({
  providedIn: 'root'
})
export class AddEditService {
  eventEmit = new EventEmitter<TableModel>();

  constructor() { }

  AddRow(row: TableModel) {
    this.eventEmit.emit(row);
    console.log(row);
  }

  UpdateRow(row: TableModel) {
    this.eventEmit.emit(row);
    console.log(row);
  }
}
