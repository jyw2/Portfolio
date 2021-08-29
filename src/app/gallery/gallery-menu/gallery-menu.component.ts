import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { fadeInTriggerDelay, fadeInTriggerNormal } from 'src/app/fadeIn.animation';
import { MediaQueriesService } from 'src/app/mediaQueries.service';

@Component({
  selector: 'app-gallery-menu',
  templateUrl: './gallery-menu.component.html',
  styleUrls: ['./gallery-menu.component.css'],
  animations: [fadeInTriggerNormal, fadeInTriggerDelay]
})
export class GalleryMenuComponent implements OnInit {
  // Component that holds filters and a title

  private filters: string[] = []
  //stores tags to send to API to get images
  //Could be replaced with a set but I only have a few elements
  //so Runtime is ok.

  //associates a name to the tag code
  public filterData:{name:string, tag:string}[] = [];

  //communication vars
  @Output() public apiCall = new EventEmitter<{}>() // connects to
  //menu and tells the menu component to re-render the images

  //collapsing bar vars
  public open:boolean = true;
  public collapse = false;
  public screenSizeSub:Subscription = new Subscription;
  public screenSize:number = 0;

  constructor( private httpClient: HttpClient,private mQs: MediaQueriesService) { }

  ngOnInit(): void {

    this.filterData.push(
      //Add the filters
      {name: 'ILLUSTRATION', tag: 'illustration' },
      {name: 'CHARACTER SHEETS', tag: 'charSheet' },
      {name: 'SPLASH ARTS', tag: 'splashArt' },
      {name: 'WALLPAPERS', tag: 'wallpaper' },
      {name: 'MOVING WP', tag: 'movingWallpaper' }
    )

    for (let filter of this.filterData ){
      //add all tags initially
      this.filters.push(filter.tag)
    }
    this.populateImages()


    //collapsing bar logic

    //gets screen size information
    this.screenSizeSub = this.mQs.getQueries().subscribe((num)=>{
      if(num> 0){
        this.open = false

      }else{
        this.open = true
      }
      this.screenSize = num;

    })
    this.mQs.manualCheck() // manually trigger the media query on first init

  }

  toggle(){
    //for opening collapsing bar
    if (this.open){

      this.open = false
    }else {

      this.open = true
    }
  }

  editFilters(filterData:any){
    //adds or removes a tag from the filters to send to the API

    if(filterData.isSelected){
      //add a filter
      this.filters.push(filterData.tag)
    }else{
      //remove a filter
      const index = this.filters.indexOf(filterData.tag)
      this.filters.splice(index,1)
    }

    //call API here
    //switch out the /a from demo site
    //API uses query strings, one for each tag
    let key = 0
    let querySt = '?'
    for (let tag of this.filters ){
      querySt += `${key++}=${tag}&`
    }
    this.httpClient.get('https://protojops.com/api'+ querySt).subscribe((images)=>{
      //send Images to the main gallery component to render
      this.apiCall.emit(images)
    })

    // console.log(this.filters)

  }

  populateImages(){
    //used on first page load to load all images
    this.httpClient.get('http://protojops.com/api/all').subscribe((images)=>{
      //send Images to the main gallery component to render
      this.apiCall.emit(images)
    })
  }

}
