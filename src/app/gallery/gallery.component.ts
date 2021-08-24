import { Component, OnInit } from '@angular/core';
import { transition,trigger,style, animate } from '@angular/animations';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
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
export class GalleryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
