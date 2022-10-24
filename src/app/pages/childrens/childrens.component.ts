import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChildrenService } from './services/children.service';
import { ref, getDatabase, onValue } from '@angular/fire/database';
import { Children } from './models/children.modal';

declare const bootstrap: any;

const numberRegEx = /\-?\d*\.?\d{1,2}/;

@Component({
  selector: 'app-childrens',
  templateUrl: './childrens.component.html',
  styleUrls: ['./childrens.component.scss']
})
export class ChildrensComponent implements OnInit, AfterViewInit {

  public childrens: any[] = [];
  public childrenForm!: FormGroup;
  public submitted = false;
  db = getDatabase();

  constructor(
    private fb: FormBuilder,
    private childrenService: ChildrenService
  ) {
    this.initChildrenForm();
  }


  initChildrenForm() {
    this.childrenForm = this.fb.group({
      local: ['', [Validators.required]],
      documentNumber: ['', [Validators.required, Validators.minLength(8), Validators.pattern(numberRegEx)]],
      fatherLastname: ['', [Validators.required]],
      motherLastname: ['', [Validators.required]],
      names: ['', [Validators.required]],
      birthday: ['2010-01-01', [Validators.required]],
      created: [new Date().getDate(), [Validators.required]]
    })
  }
  ngAfterViewInit(): void {
    const modal = document.getElementById('insertarNinio')!;
    modal.addEventListener('hidden.bs.modal', () => {
      this.initChildrenForm();
    })
  }

  ngOnInit(): void {
    const starCountRef = ref(this.db, 'childrens');
    onValue(starCountRef, (snapshot) => {
      this.childrens = [];
      const data = snapshot.val();
      if (!data) return;
      Object.keys(data).forEach(key => {

        this.childrens.push(Children.newChildren(data[key as keyof typeof data]));
      })
      console.log(this.childrens);
    });
  }

  saveChildren() {
    this.submitted = true;

    if (this.childrenForm.invalid) return;

    this.childrenService.saveChildren(this.childrenForm).then(resp => {
      const modal = document.getElementById('insertarNinio');
      const myModal = bootstrap.Modal.getInstance(modal);
      myModal.hide();
    });
  }

}
