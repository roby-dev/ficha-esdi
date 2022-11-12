import { Injectable } from '@angular/core';
import { Database,set,ref,update,getDatabase,onValue } from '@angular/fire/database';
import { v4 as uuidv4 } from 'uuid';

import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Children } from '../models/children.model';
import { remove } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {

  database = getDatabase();
  public selectedChildren!:Children;

  constructor(
    private db:Database,
  ) { }

  saveChildren(formData:FormGroup){
    const local = String(formData.get('local')!.value);
    const documentNumber = String(formData.get('documentNumber')!.value);
    const lastname = String(formData.get('lastname')!.value).trim().toUpperCase();    
    const names = String(formData.get('names')!.value).trim().toUpperCase();
    const birthday = moment(String(formData.get('birthday')!.value)).format('YYYY-MM-DD');
    const created = moment(String(formData.get('created')!.value)).format('YYYY-MM-DD');

    const uuid = uuidv4();

    return set(ref(this.db,`childrens/${uuid}`),{
      local,
      documentNumber,
      lastname,
      names,
      birthday,
      created
    });
  }

  updateChildren(formData:FormGroup,id:string){
    const local = String(formData.get('local')!.value);
    const documentNumber = String(formData.get('documentNumber')!.value);
    const lastname = String(formData.get('lastname')!.value).trim().toUpperCase();    
    const names = String(formData.get('names')!.value).trim().toUpperCase();
    const birthday = moment(String(formData.get('birthday')!.value)).format('YYYY-MM-DD');
    const created = moment(String(formData.get('created')!.value)).format('YYYY-MM-DD');

    return update(ref(this.db,`childrens/${id}`),{
      local,
      documentNumber,
      lastname,
      names,
      birthday,
      created
    });
  }

  removeChildren(id:string){
    return remove(ref(this.db,`childrens/${id}`));
  }
}
