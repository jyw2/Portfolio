import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaQueriesService } from '../mediaQueries.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

  public smallScreen:boolean = false;
  public screenSizeSub:Subscription = new Subscription;
  public screenSize:number = 0;
  public open:boolean = true;
  constructor(private mQs: MediaQueriesService) { }
  public icon:string = '../assets/hamburger.png';

  ngOnInit(): void {

    //gets screen size information
    this.screenSizeSub = this.mQs.getQueries().subscribe((num)=>{
      if(num> 0){
        this.open = false
        this.icon = '../assets/hamburger.png'
      }else{
        this.open = true
      }
      this.screenSize = num;

    })

    this.mQs.manualCheck()

  }

  toggle(){
    if (this.open){
      this.icon = '../assets/hamburger.png'
      this.open = false
    }else {
      this.icon = '../assets/x.png'
      this.open = true
    }
  }

  ngOnDestroy() : void{
    this.screenSizeSub.unsubscribe()
  }



}
