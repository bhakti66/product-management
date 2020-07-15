import { Injectable } from "@angular/core";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { tap, flatMap } from "rxjs/operators";

import { map } from "rxjs/operators";
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProductStateModel } from './product-state.model';
import { GetAllProducts, MarkProduct, GetMarkedProducts, AddProduct, DeleteProduct } from './product.action';
import { environment } from '../../../environments/environment';
import { Product } from '../../models/products';
import { ProductService } from '../../services/product.service';


@State<ProductStateModel>({
  name: "product",
  defaults: {}
})
export class ProductState {
  constructor(private http: HttpClient, private prodService: ProductService) { }

  @Action(GetAllProducts)
  getAllProducts(ctx: StateContext<ProductStateModel>) {
    return this.prodService.getAllProducts().pipe(
      tap(results => {
        ctx.patchState({ products: results });
      }, (err) => {
        ctx.patchState({ products: [] });
      })
    );
  }

  @Action(MarkProduct)
  markProduct(ctx: StateContext<ProductStateModel>, { payload }) {
    return this.prodService.markProduct(payload.email, payload.key, payload.productId).pipe(
      tap(results => {
        ctx.patchState({ product: results });
      }, (err) => {
        ctx.patchState({ product: {} });
      })
    );
  }

  @Action(GetMarkedProducts)
  GetMarkedProducts(ctx: StateContext<ProductStateModel>, { payload }:GetMarkedProducts){
    return this.prodService.getMarkedProducts(payload.email, payload.key).pipe(
      tap(results => {
        ctx.patchState({ products: results });
      }, (err) => {
        ctx.patchState({ products: [] });
      })
    );
  }

  @Action(AddProduct)
  AddProduct(ctx: StateContext<ProductStateModel>, { payload }: AddProduct){
    return this.prodService.addUpdateProduct(payload).pipe(
      tap(results => {
        ctx.patchState({ products: [...ctx.getState().products, results] });
      }, (err) => {
        console.log('err in state')
        ctx.patchState({ product: {} });
      })
    );
  }

  @Action(DeleteProduct)
  DeleteProduct(ctx: StateContext<ProductStateModel>,payload){
    return this.prodService.deleteProduct(payload.payload).pipe(
      tap(results => {
        // ctx.patchState({ product: results });
        ctx.patchState({ products: [...ctx.getState().products, results] });
      }, (err) => {
        ctx.patchState({ product: {} });
      })
    );
  }
}