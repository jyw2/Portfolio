import { Component, Input, OnInit , ViewEncapsulation,  OnChanges
} from '@angular/core';
import { BlogData } from '../blogData.model';
import { transition,trigger,style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('spawn', [
      state('visible',style({'opacity': '1'})),
      state('hidden', style({'opacity': '0'})),
      transition ( 'hidden => visible', [
       animate('800ms 0ms ease-out')])
      ]),
      trigger('spawn1', [
        state('visible',style({'opacity': '1'})),
        state('hidden', style({'opacity': '0'})),
        transition ( 'hidden => visible', [
         animate('800ms 200ms ease-out')])
      ]),
      trigger('spawn2', [
        state('visible',style({'opacity': '1'})),
        state('hidden', style({'opacity': '0'})),
        transition ( 'hidden => visible', [
         animate('800ms 400ms ease-out')])
      ])

  ]
})
export class BlogComponent implements OnInit, OnChanges {

  public spawn:string = '';

  @Input() public blog: BlogData = new BlogData('','','','')

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.spawn = 'hidden'

    setTimeout(()=>{
      this.spawn = 'visible'

    },200)
    window.scrollTo(0,0)

  }

}
