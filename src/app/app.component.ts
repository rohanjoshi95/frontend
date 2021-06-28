import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Flexmoney Assignment';
  obj: any;
  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
    this.httpClient.get("http://backend:8987/api/data").subscribe(response => {
      this.obj = response;
    });
  }
}
