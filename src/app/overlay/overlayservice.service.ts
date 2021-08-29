import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class OverlayService{
  //connects overlay to the gallery component

  private overlayCall = new Subject<string>()

  callOverlay(imgLink:string){
    //an image was clicked
    this.overlayCall.next(imgLink)
  }

  getOverlayCallObs(){
    //return subject for others to subscribe to
    return this.overlayCall
  }

}
