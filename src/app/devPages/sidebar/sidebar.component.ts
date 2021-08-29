import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../blogService.service';
import { Section } from '../section.model';
import { MediaQueriesService } from '../../mediaQueries.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  public sections: Section[] = [];
  public collapse = false;
  public smallScreen = false;
  public screenSizeSub:Subscription = new Subscription;
  public open:boolean = true;
  public screenSize:number = 0;
  private blogClickSub:Subscription = new Subscription;

  constructor( private blogService: BlogService,private mQs: MediaQueriesService) {}

  ngOnInit(): void {



    this.sections = this.blogService.getSections()
    if (this.smallScreen){
      this.collapse = true
    }

    //gets screen size information
    this.screenSizeSub = this.mQs.getQueries().subscribe((num)=>{
      if(num> 0){
        this.open = false

      }else{
        this.open = true
      }
      this.screenSize = num;

    })

    this.mQs.manualCheck()

    this.blogClickSub = this.blogService.getBlogClicked().subscribe(()=>{
      //close sidebar on smaller screens after clicking a project
      if(this.screenSize > 0){
        this.open = false
      }
    })
  }


  toggle(){
    if (this.open){

      this.open = false
    }else {

      this.open = true
    }
  }


  ngOnDestroy() : void{
    this.screenSizeSub.unsubscribe()
  }

}
