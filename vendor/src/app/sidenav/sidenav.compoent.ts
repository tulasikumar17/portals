import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Data1Service } from '../data1.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Input() sideNavStatus: boolean = false;
  list = [
    {
      nav: 'home',
      name: 'Home',
      icon: 'fa-solid fa-house'
    },
    {
      nav: 'profile',
      name: 'Profile',
      icon: 'fa-solid fa-user'
    },
    {
      nav: 'purchase_od',
      name: 'purchase od',
      icon: 'fa-solid fa-money-check'
    },
    {
      nav: 'quotation',
      name: 'Quotation Request',
      icon: 'fa-solid fa-list'
    },
    {
      nav: 'goods_receipt',
      name: 'Goods Receipt',
      icon: 'fa-solid fa-receipt'
    },
    {
      nav: 'invoice',
      name: 'Invoice Details',
      icon: 'fa-solid fa-file-invoice'
    },
    {
      nav: 'pay_age',
      name: 'Payments & Aging',
      icon: 'fa-solid fa-money-bill'
    },
    {
      nav: 'cd_memo',
      name: 'Credit/Debit Memo',
      icon: 'fa-solid fa-credit-card'
    }
  ] 
  
  constructor(private router: Router, private http: HttpClient, private data1: Data1Service){

  }

  //data
  data_prof:any;
  data_pu_o:any;
  data_quot:any;
  data_goods:any;
  data_inv:any;
  data_payage:any;
  data_cdmemo:any;

  ngOnInit(): void{

  }
  home() {
    this.router.navigate(['/home']);
  }
  prof(){
      this.router.navigate(['/profile']);

  }
  pu_o(){
        this.router.navigate(['/purchase_od']);
     
  }
  quot(){
        this.router.navigate(['/quotation']);
      
  }
  goods(){
        this.router.navigate(['/goods_receipt']);
     
  }
  inv(){
        this.router.navigate(['/invoice']);
     
  }
  payage(){
        this.router.navigate(['/pay_age']);
     
  }
  cdmemo(){
        this.router.navigate(['/cd_memo']);
  }
}
