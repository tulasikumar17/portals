import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { PurchaseodComponent } from './purchaseod/purchaseod.component';
import { QuotationComponent } from './quotation/quotation.component';
import { GoodsrecComponent } from './goodsrec/goodsrec.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PayageComponent } from './payage/payage.component';
import { CdmemoComponent } from './cdmemo/cdmemo.component';
import { NodataComponent } from './nodata/nodata.component';
const routes: Routes = [
  { path:'', redirectTo:'/login', pathMatch:'full'},
  { 
    path : 'login',
    component : AppComponent,
    children : [
      {
        path : '',
        component : LoginComponent
      }
    ]
  },
  { path: 'home', component: HomeComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'purchase_od', component: PurchaseodComponent},
  { path: 'quotation', component: QuotationComponent},
  { path: 'goods_receipt', component: GoodsrecComponent},
  { path: 'invoice', component: InvoiceComponent},
  { path: 'pay_age', component: PayageComponent},
  { path: 'cd_memo', component: CdmemoComponent},
  { path: '*', component: NodataComponent },
  //{ path: 'salesord', component: SalesordComponent},
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
