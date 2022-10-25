import { Injectable } from '@angular/core';
import { Database,set,ref,update,getDatabase,onValue } from '@angular/fire/database';

import { FormGroup } from '@angular/forms';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class ChildrenService {

  database = getDatabase();

  constructor(
    private db:Database,
  ) { }

  saveChildren(formData:FormGroup){
    const local = String(formData.get('local')!.value);
    const documentNumber = String(formData.get('documentNumber')!.value);
    const lastname = String(formData.get('lastname')!.value).trim().toUpperCase();    
    const names = String(formData.get('names')!.value).trim().toUpperCase();
    const birthday = String(formData.get('birthday')!.value);
    const created = moment(formData.get('created')!.value).format('YYYY-MM-DD');

    return set(ref(this.db,`childrens/children-${documentNumber}`),{
      local,
      documentNumber,
      lastname,
      names,
      birthday,
      created
    });
  }
}
