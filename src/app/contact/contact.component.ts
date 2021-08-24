import { Component, OnInit } from '@angular/core';
import { transition,trigger,style, animate } from '@angular/animations';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [
    trigger('spawn', [transition ( 'void => *',
      [animate(0,style({'opacity': '0'})),
      animate('800ms 0ms ease-out' )])]),
    trigger('spawn1', [transition ( 'void => *',
      [animate(0,style({'opacity': '0'})),
      animate('800ms 200ms ease-out' )])]),
    trigger('spawn2', [transition ( 'void => *',
      [animate(0,style({'opacity': '0'})),
      animate('800ms 400ms ease-out' )])])
  ]
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
