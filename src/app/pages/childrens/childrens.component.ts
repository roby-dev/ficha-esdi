import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChildrenService } from './services/children.service';
import { ref, getDatabase, onValue } from '@angular/fire/database';
import { Children } from './models/children.modal';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from 'src/app/services/utility.service';
import { Subscription } from 'rxjs';
import { delay, filter, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

const numberRegEx = /\-?\d*\.?\d{1,2}/;

@Component({
  selector: 'app-childrens',
  templateUrl: './childrens.component.html',
  styleUrls: ['./childrens.component.scss'],
})
export class ChildrensComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  displayedColumns: string[] = ['fullName', 'local', 'fecha_apli', 'fecha_egre'];
  public childrens: any[] = [];
  db = getDatabase();
  private newChildrenSub!:Subscription;
  private childrenDialogComponent!:MatDialogRef<ChildrenDialogComponent, any>;

  constructor(
    private changeDetector: ChangeDetectorRef,
    public childrenDialog: MatDialog,
    private childrenService: ChildrenService,
    private utilities:UtilityService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const starCountRef = ref(this.db, 'childrens');
    onValue(starCountRef, (snapshot) => {
      this.childrens = [];
      const data = snapshot.val();
      if (!data) return;
      Object.keys(data).forEach((key) => {
        this.childrens.push(
          Children.newChildren(data[key as keyof typeof data])
        );
      });
      console.log(this.childrens);
      this.dataSource = new MatTableDataSource(this.childrens);
      this.changeDetector.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.newChildrenSub = this.utilities.newChildren$.pipe(delay(50)).subscribe(
      (form)=>{       
        this.saveChildren(form);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openChildrenDialog() {
    this.childrenDialogComponent = this.childrenDialog.open(ChildrenDialogComponent);   
  }

  saveChildren(form:FormGroup) {
    this.childrenService.saveChildren(form).then((resp) => {
      this.childrenDialogComponent.close();      
      this._snackBar.open('Niño creado exitosamenet');
    });
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog/children-dialog.component.html',
  styleUrls: ['dialog/children-dialog.component.scss'],
})
export class ChildrenDialogComponent implements OnInit {
  public childrenForm!: FormGroup;
  public submitted = false;
  public locals = environment.locals;

  constructor(   
    private fb: FormBuilder,
    private utilities:UtilityService
  ) {}

  ngOnInit(): void {
    this.initChildrenForm();
  } 

  initChildrenForm() {
    this.childrenForm = this.fb.group({
      local: ['', [Validators.required]],
      documentNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(numberRegEx),
        ],
      ],
      lastname: ['', [Validators.required]],      
      names: ['', [Validators.required]],
      birthday: ['2010-01-01', [Validators.required]],
      created: [new Date().getDate(), [Validators.required]],
    });
  }

  saveChildren(){
    this.submitted = true;
    if (this.childrenForm.invalid) return;
    this.utilities.newChildren$.emit(this.childrenForm);
  }
}
