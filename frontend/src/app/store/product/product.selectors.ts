import { Selector } from "@ngxs/store";
import { User } from "../../models/user";
import { ProductState } from './product.state';
import { ProductStateModel } from './product-state.model';

export class ProductSelectors {
  @Selector([ProductState])
  static getProducts(state: ProductStateModel) {
    return state.products;
  }
}