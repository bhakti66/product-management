import { Component, OnInit, Input } from '@angular/core';
import { ProductSelectors } from '../store/product/product.selectors';
import { Observable } from 'rxjs';
import { Product } from '../models/products';
import { Select } from '@ngxs/store';


@Component({
  selector: 'app-marked-products',
  templateUrl: './marked-products.component.html',
  styleUrls: ['./marked-products.component.css']
})
export class MarkedProductsComponent implements OnInit {
  @Input('key') key: String
  @Select(ProductSelectors.getProducts) products$: Observable<Product[]>;
  products: Product[] = []
  page = 1;
  pageSize = 10;
  constructor() { }

  ngOnInit() {
    this.products$.subscribe((results) => {
      this.products = results
      if (this.key == 'cartProducts') {
        var updatedProducts = [];
        var cnt = 0
        results.map((item)=>{
          updatedProducts.map((updatedItem)=>{
            if(updatedItem._id==item._id){
              cnt++
              updatedItem['qty']++
            }
          })
          if(cnt==0){
            item['qty'] = 1
            updatedProducts.push(item)
          }
        })
        this.products = updatedProducts
      }
    })
  }

}
