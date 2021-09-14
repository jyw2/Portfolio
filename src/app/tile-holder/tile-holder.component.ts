import { Component, OnInit } from '@angular/core';
import { TileData } from './tile.model';

@Component({
  selector: 'app-tile-holder',
  templateUrl: './tile-holder.component.html',
  styleUrls: ['./tile-holder.component.css']
})
export class TileHolderComponent implements OnInit {
  public tiles:TileData[] = [];

  constructor() {
    this.tiles.push( new TileData ('../assets/ryu.png','FIREBALL', 'A showcase of my problem solving proccess', '> See project','rgb(255, 255, 102)','black','rgb(31, 31, 31)','dev/fireball'))
    this.tiles.push( new TileData ('../assets/Arrows.png','WEB APPS', 'Web applications built using different technologies', '> See projects','rgb(180, 180, 230)','white','rgb(250, 250, 255)','dev/grind'))
    this.tiles.push( new TileData ('../assets/Controller.png','GAME DEV', 'Pipelines, Tools, Engines, Models, and Systems', 'See projects', 'rgb(153, 0, 0)','white','white','dev/pipe'))
    this.tiles.push( new TileData ('../assets/machine.png','MACHINE LEARNING', 'In development','', 'white','black','black',''))
  }

  ngOnInit(): void {
  }

}
