import { Product } from "../../models/products";

export class GetAllProducts {
    static readonly type = "[Product] GetAllProducts";
    constructor() { }
}

export class GetMarkedProducts {
    static readonly type = "[Product] GetMarkedProducts"
    constructor(public payload: {email: string, key: string}) { }
}

export class MarkProduct{
    static readonly type = "[Product] MarkProduct"
    constructor(public payload: {email: string, key: string, productId: number}) { }
}

export class AddProduct{
    static readonly type = "[Product] AddProduct"
    constructor(public payload: Product){}
}

export class DeleteProduct{
    static readonly type = "[Product] DeleteProduct"
    constructor(public payload: {_id:string}){}
}