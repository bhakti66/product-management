import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngxs/store";
import { Login } from "../store/auth/auth.action";
import { Router, RouterModule, Routes, RouterOutlet  } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AddProduct, GetAllProducts } from '../store/product/product.action';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../models/products';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {
  @Input('itemToEdit') itemToEdit: Product;
  @Input('modalReference') modalReference;
  productForm: FormGroup;
  constructor(private store: Store,private router: Router,    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      price: [0, Validators.required],
      stock: [0, Validators.required]
    });
    if(this.itemToEdit!=null){
      this.productForm.setValue({"title":this.itemToEdit.title,"price":this.itemToEdit.price,"stock":this.itemToEdit.stock})
    }
    else{
      this.productForm.setValue({"title":"","price":0,"stock":0})
    }
  }

  saveDetails(){
    if(this.itemToEdit!=null){
      this.productForm.value['_id'] = this.itemToEdit['_id']
    }
    this.store.dispatch(new AddProduct(this.productForm.value)).subscribe(result => {
      this.modalReference.close()
      this.store.dispatch(new GetAllProducts())
    },
    error => {
    })
    // else{
    //   this.store.dispatch(new AddProduct(this.productForm.value)).subscribe(result => {
    //     console.log(this.modalService.activeInstances())
    //   },
    //   error => {
    //   })
    // }
  }

}
