
import { Component, Input, OnInit } from '@angular/core';
import { fadeInTrigger } from 'src/app/fadeIn.animation';
import { OverlayService } from 'src/app/overlay/overlayservice.service';


@Component({
  selector: 'app-gallery-tile',
  templateUrl: './gallery-tile.component.html',
  styleUrls: ['./gallery-tile.component.css'],
  animations: [ fadeInTrigger]
})
export class GalleryTileComponent implements OnInit {


  @Input() public imageLink:string = ''
  @Input() public pvLink:string =''

  constructor(private overlayCallService:OverlayService) { }

  ngOnInit(): void {
  }

  openOverlay(){
    this.overlayCallService.callOverlay(this.imageLink)
  }

}
