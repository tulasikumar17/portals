import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';


//ng add @angular/material
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
//components
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';

import { SidenavComponent } from './sidenav/sidenav.component';
import { ProfileComponent } from './profile/profile.component';
import { QuotationComponent } from './quotation/quotation.component';
import { PurchaseodComponent } from './purchaseod/purchaseod.component';
import { GoodsrecComponent } from './goodsrec/goodsrec.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PayageComponent } from './payage/payage.component';
import { CdmemoComponent } from './cdmemo/cdmemo.component';
import { Data1Service } from './data1.service';
import { NodataComponent } from './nodata/nodata.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotfoundComponent,
    HomeComponent,
    //DashboardComponent,
    HeaderComponent,
    SidenavComponent,
    ProfileComponent,
    QuotationComponent,
    PurchaseodComponent,
    GoodsrecComponent,
    InvoiceComponent,
    PayageComponent,
    CdmemoComponent,
    NodataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    FormsModule,
    MatDividerModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    Data1Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
