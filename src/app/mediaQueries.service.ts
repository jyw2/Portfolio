import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class MediaQueriesService {

  //emits screen changes represented as 0 1 2. 0 is largest, 2 is smallest
  public screenSize = new Subject<number>()

  constructor(private breakObs: BreakpointObserver){

    this.breakObs.observe(['(min-width:1530px)']).subscribe((state:BreakpointState)=>{
      if(state.matches){
        (document.querySelector('html') as HTMLElement).style.fontSize = '16px'
        this.screenSize.next(0)
      }
    })

    //Breakpoint1
    this.breakObs.observe(['(max-width:1529px)']).subscribe((state:BreakpointState)=>{
      if(state.matches){
        (document.querySelector('html') as HTMLElement).style.fontSize = '20px'
        this.screenSize.next(1)
      }
    })

    this.breakObs.observe(['(max-width:600px)']).subscribe((state:BreakpointState)=>{
      (document.querySelector('html') as HTMLElement).style.fontSize = '15px'
      if(state.matches){
        this.screenSize.next(2)
      }
    })
  }
  getQueries(){
    //returns a subject with numbers representing screen size
    return this.screenSize
  }

  manualCheck(){
    //use for initial Check
    if(this.breakObs.isMatched('(min-width:1530px)')){
      (document.querySelector('html') as HTMLElement).style.fontSize = '16px'
      this.screenSize.next(0)

    }else if (this.breakObs.isMatched('(max-width:1529px )') &&
    this.breakObs.isMatched('( min-width:601px)')){
      (document.querySelector('html') as HTMLElement).style.fontSize = '20px'
      this.screenSize.next(1)

    }else if (this.breakObs.isMatched('(max-width:600px)')){
      (document.querySelector('html') as HTMLElement).style.fontSize = '15px'
      this.screenSize.next(2)
    }
  }

}
