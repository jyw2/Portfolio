import { Component, Input, OnInit } from '@angular/core';
import { TileData } from '../tile-holder/tile.model';
import { transition,trigger,style, animate } from '@angular/animations';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css'],
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
export class TileComponent implements OnInit {
  @Input() public tileData:TileData;

  constructor() {
      this.tileData = new TileData ('','','','','','','','')
   }

  ngOnInit(): void {
  }

}
