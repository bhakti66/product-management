import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { NgxsModule } from "@ngxs/store";
import { Reducers } from "./store";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./token.interceptor";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StockUpdateComponent } from './stock-update/stock-update.component';
import { AuthService } from './services/auth.service';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { MarkedProductsComponent } from './marked-products/marked-products.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    StockUpdateComponent,
    AddEditProductComponent,
    MarkedProductsComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot(Reducers),
    HttpClientModule
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
