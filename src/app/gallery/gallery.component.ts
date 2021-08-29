
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  //Component that covers the whole gallery section. holds a menu and images

  private images:[] = []
  // Objects with properties of:
  // rating: {type: Number, required: true, default: 0},
  // tag:{type: String, required: true},
  // link: {type: String, required: true},
  // pvLink:  {type: String, required: false}

  //image Containers
  @ViewChild('left')  leftCol:ElementRef;
  @ViewChild('right') rightCol:ElementRef;
  @ViewChild('images') imagesEle:ElementRef;

  //arrays property binded to rendered images in left and right image containers
  public renderedImagesL:
  {
    rating: number,
    tag:string,
    link: string,
    pvLink: string
  } [] = [{
    rating: 0,
    tag:'',
    link: '',
    pvLink: ''
  }];
  public renderedImagesR: {
    rating: number,
    tag:string,
    link: string,
    pvLink: string
  }[] = [{
    rating: 0,
    tag:'',
    link: '',
    pvLink: ''
  }];

  //index of images that have been shown
  private imageIndex = 0

  //helper variabe for controlling image rendering on end of page
  private delay = false



  constructor() { }

  ngOnInit(): void {


    //for loading more images as you scroll
    document.addEventListener('scroll',() => {

      if (this.imageIndex > this.images.length-1){
          //don't run if all images loaded
          return
      }
      if(  this.delay == false){
        //if bot of page reached load more
          this.render(4,350)

          this.delay = true

          setTimeout(() =>{
              this.delay = false
          }, 1500)

      }
  })
  }

  newImages(imagesIn:any){
    //takes images, saves them and renders some
    this.images = imagesIn
    this.imageIndex = 0
    this.renderedImagesL = []
    this.renderedImagesR = []
    //empty the rendered images
    this.shuffleArray()
    this.render(4,350)  }

  shuffleArray(){
    //shuffles array contents using knuth algorithm

    let currentIndex = this.images.length // one more than max index
    let targetSwap
    let temp

    //while we still have elements to swap
    while(currentIndex != 0){

        //get a random element from the front area and move current up one
        targetSwap = Math.floor(Math.random()*currentIndex--);

        //swap the current element with that of the target
        temp = this.images[targetSwap]
        this.images[targetSwap] = this.images[currentIndex]
        this.images[currentIndex] = temp

    }
 }



  render(max:number, delay:number,current:number = 0, isLeft:boolean = true){
    //recursively adds max number of images

    //checks if one col has too many images and is too tall
    if ((this.leftCol.nativeElement as Element).clientHeight < (this.rightCol.nativeElement as Element).clientHeight){
      isLeft = true
    }else{
      //switch to right col
      isLeft = false
    }

    if(current == max){
      //check if weve added 'max' images yet
      return
    }else if (isLeft){
      //add to left col
      this.renderedImagesL.push(...(this.images.slice(this.imageIndex,this.imageIndex+1) as []))
      this.imageIndex += 1

      setTimeout(()=>{
        //trigger the next add after a delay
        this.render(max,delay,current+1, isLeft)
      },delay)
    }else if (!isLeft){
       //add to right col
       this.renderedImagesR.push(...(this.images.slice(this.imageIndex,this.imageIndex+1) as []))
       this.imageIndex += 1
       setTimeout(()=>{
         //trigger the next add after a delay
        this.render(max,delay,current+1, isLeft)
      },delay)
    }

  }


}
