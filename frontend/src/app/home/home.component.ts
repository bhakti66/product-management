import { Component, OnInit } from '@angular/core';
import { Store, Select } from "@ngxs/store";
import { GetAllProducts, MarkProduct, GetMarkedProducts, DeleteProduct } from '../store/product/product.action';
import { Product } from '../models/products';
import { AuthService } from '../services/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProductSelectors } from '../store/product/product.selectors';
import { Observable } from 'rxjs';
import { AuthSelectors } from '../store/auth/auth.selectors';
import { User } from '../models/user';
import { CurrentUser } from '../store/auth/auth.action';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Select(ProductSelectors.getProducts) products$: Observable<Product[]>;
  @Select(AuthSelectors.currentUser) currentUser$: Observable<User>;
  currentUser : User;
  currentUserDetails = {}
  products: Product[] = []
  page = 1;
  pageSize = 10;
  showFav: boolean = false
  showCart: boolean = false
  itemToEdit: Product = {}
  isViewMarked: Boolean = false
  markedKey: String = ""
  modalReference
  constructor(private store: Store, private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit() {
    this.currentUserDetails = JSON.parse(localStorage.getItem("currentUser"));
    this.authService.getCurrentUserDetails(this.currentUserDetails['email']).subscribe((result) => {
      this.currentUser = result
    })
    this.currentUser$.subscribe((result)=>{
      console.log('current user ',result)
      this.currentUser = result
    })
    this.getAllProducts()

  }

  getAllProducts() {
    this.isViewMarked = false
    this.store.dispatch(new GetAllProducts())
    this.products$.subscribe((results)=>{
      if(results){
        this.products=[]
        this.products = results
        this.products.map((item) => {
          if (this.currentUser['favProducts'].indexOf(item['_id']) >= 0) {
            item['isFav'] = true
          }
          else {
            item['isFav'] = false
          }
        })
      }
    })
  }

  markItem(item, key) {
    if (key == 'favProducts') {
      item.isFav ? item.isFav = false : item.isFav = true
    }
    var payload = { "email": this.currentUserDetails['email'], "key": key, "productId": item._id }
    this.store.dispatch(new MarkProduct(payload)).subscribe((results) => {
      this.store.dispatch(new CurrentUser(this.currentUserDetails['email']))
      this.store.dispatch(new GetAllProducts())
    },(err)=>{
    })
  }

  viewMarked(key) {
    this.isViewMarked = true
    this.markedKey = key
    var payload = { "email": this.currentUserDetails['email'], "key": key }
    this.store.dispatch(new GetMarkedProducts(payload))
  }

  open(content,item) {
    this.itemToEdit = item
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  search(event) {
    if(event.key=='Enter'){
      var key = document.getElementById("search")['value'].toUpperCase();
      var tbl = document.getElementById("productList");
      var tr = tbl.getElementsByTagName("tr")
      var th = tbl.getElementsByTagName("th");
  
      for (var i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
        for (var j = 0; j < th.length; j++) {
          var td = tr[i].getElementsByTagName("td")[j];
          if (td) {
            if (td.innerHTML.toUpperCase().indexOf(key.toUpperCase()) > -1) {
              tr[i].style.display = "";
              break;
            }
          }
        }
      }
    }
  }

  delete(item){
    this.store.dispatch(new DeleteProduct(item._id)).subscribe((results) => {
      
      this.store.dispatch(new CurrentUser(this.currentUserDetails['email']))
      this.store.dispatch(new GetAllProducts())
    },(err)=>{

    })
  }
}
  
