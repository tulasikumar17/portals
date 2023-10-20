import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-cdmemo',
  templateUrl: './cdmemo.component.html',
  styleUrls: ['./cdmemo.component.css']
})
export class CdmemoComponent {
  title = 'HeaderSideNav';
  sideNavStatus: boolean = false;

  constructor(private router : Router , private http: HttpClient) { }
  vencdmemo:any;
  
  

  ngOnInit(): void {
    this.http.post("http://localhost:3030/vencdmemo","").subscribe(resp=>{
      this.vencdmemo = resp;
      console.log(this.vencdmemo);

  })
}

}
