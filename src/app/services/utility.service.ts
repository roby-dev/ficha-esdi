import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  public newChildren$:EventEmitter<FormGroup>=new EventEmitter<FormGroup>();

  constructor() { }
}
