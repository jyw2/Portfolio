import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OverlayService } from './overlayservice.service';
import { fadeInTrigger } from 'src/app/fadeIn.animation';
import { fadeOutTrigger } from '../fadeOut.animation';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css'],
  animations: [fadeInTrigger, fadeOutTrigger]
})
export class OverlayComponent implements OnInit, OnDestroy{
  //Overlay component for isolating images

  private clickSub = new Subscription
  public imgLink:string = ''
  public open:boolean = false;

  constructor(private overlayService:OverlayService) { }

  ngOnInit(): void {
    this.clickSub = this.overlayService.getOverlayCallObs().subscribe((image:string)=>{
      //when an image is clicked turn on!
      this.imgLink = image
      this.open = true

    })
  }

  ngOnDestroy(): void {
    this.clickSub.unsubscribe()
  }

}
