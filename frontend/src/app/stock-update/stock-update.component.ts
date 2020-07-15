import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-stock-update',
  templateUrl: './stock-update.component.html',
  styleUrls: ['./stock-update.component.css']
})
export class StockUpdateComponent implements OnInit, OnChanges {
  @Input('stockCount') stockCount: number;
  @Input('itemId') itemId: number;
  stockLevel : string
  stockClass : string
  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges(){
    if(this.stockCount <= 10 ){
      this.stockLevel = "Low"
      this.stockClass = "C"
    }
    else if(this.stockCount > 10 && this.stockCount <= 20){
      this.stockLevel = "Yellow"
      this.stockClass = "B"
    }
    else{
      this.stockLevel = "High"
      this.stockClass = "A"
    }
  }
}
