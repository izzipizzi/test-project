import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('title') title: string = '';

  userName: string = 'Andrew';

  constructor() {
  }

  ngOnInit(): void {
  }

}
