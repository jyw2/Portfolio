import { transition,trigger,style, animate } from '@angular/animations';
import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogData } from '../blogData.model';
import { BlogService } from '../blogService.service';

@Component({
  selector: 'app-sidebar-element',
  templateUrl: './sidebar-element.component.html',
  styleUrls: ['./sidebar-element.component.css'],
  animations: [
    trigger('selection', [transition ( 'void => *', [animate(0,style({'transform': 'translateY(-10px)'})), animate('400ms 0ms ease-out' )])])
  ]

})
export class SidebarElementComponent implements OnInit, OnDestroy {

  @Input() public name:string = ''
  @Input() public links: BlogData[] = [];
  @Input() public section: string = '';
  @Input() public selected:boolean = false;
  private closeAllSub:Subscription = new Subscription();

  constructor(private blogService: BlogService) { }

  select(){

    //closes all other sections and opens self if not already selected
    if(this.selected){
      // this.selected = false
    }else{

      this.blogService.closeAll()
      this.selected = true
      console.log('selectCalled')
    }
  }

  test(){
    console.log('test')
  }

  ngOnInit(): void {
    this.closeAllSub = this.blogService.getCloseAll().subscribe(() =>{
      this.selected = false;
      console.log('sub heard')
    })
  }

  ngOnDestroy(): void {
    this.closeAllSub.unsubscribe()
  }

  blogClick(id:string){
    this.blogService.emitBlogClicked(id)
  }

}
