import { environment } from "src/environments/environment";
import * as moment from "moment";
import 'moment/locale/es';

export class Children {
  public static newChildren(children:any){
    return new Children(
      children['local'],
      children['documentNumber'],
      children['lastname'],
      children['names'],
      children['birthday'],
      children['created'],
    );
  }

  constructor(
    public local:string,
    public documentNumber:string,
    public lastname:string,
    public names:string,
    public birthday:string,
    public created:string,
    public id?:string,
  ){}

  get fullName(){
    return `${this.lastname}, ${this.names}`
  }

  get myLocal(){
    return environment.locals[this.local as keyof typeof environment.locals];
  }

  get myAge(){
    const birthday = moment(this.birthday);
    const today = moment(new Date());
    return today.diff(birthday,'months');
  }

  get ingresoHasta(){
    moment.locale('es');
    const hasta = moment(this.created).add(40,'days').format('dddd DD [de] MMMM [del] YYYY');
    return hasta;
  }

  get ingresoDesde(){
    moment.locale('es');
    const desde = moment(this.created).add(19,'days').format('dddd DD [de] MMMM [del] YYYY');
    return desde;
  }

  get fechaEgreso(){
    moment.locale('es');
    const egreso = moment(this.birthday).add(35,'months').format('dddd DD [de] MMMM [del] YYYY');
    return egreso;
  }

  get validIngreso():boolean{
    const desde = moment(this.created).add(19,'days');
    const hasta = moment(this.created).add(40,'days');
    const today = moment();
    return today >= desde && today <= hasta;
  }

  get validEgreso():boolean{
    const desde = moment(this.birthday).add(35,'months');
    const today = moment();
    return today >= desde;
  }

  get birthdayFormatted():string{
    if(this.birthday.length===0) return '2009-01-01';
    return moment(this.birthday).format('yyyy-MM-DD[T00:00:00]');
  }

  get createdFormatted():string{
    if(this.created.length===0) return '';
    return moment(this.created).format('yyyy-MM-DD[T00:00:00]');
  }

}
