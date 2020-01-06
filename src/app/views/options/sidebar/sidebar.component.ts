import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tl-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public itemList = [
    {
      link: '',
      name: '',
      icon: ''
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
