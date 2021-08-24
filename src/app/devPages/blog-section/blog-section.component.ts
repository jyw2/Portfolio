import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../blogService.service';
import { ActivatedRoute } from '@angular/router';
import { BlogData } from '../blogData.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.css']
})
export class BlogSectionComponent implements OnInit , OnDestroy{

  private blogId:string = ''
  public blog: BlogData = new BlogData('','','','')
  private blogClickedSub: Subscription = new Subscription

  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //sets the selected section and preps blog id to send to blog componenet
    this.blogId = this.route.snapshot.params['blog']
    this.blog = this.blogService.select(this.blogId)
    // Sets initial selected seciton, will not work after sections are instanced

    this.blogClickedSub = this.blogService.getBlogClicked().subscribe( (blog:BlogData) =>{
      this.blog = blog
    })
  }

  ngOnChanges(): void {
    this.blogId = this.route.snapshot.params['blog']
  }

  ngOnDestroy(): void {
    this.blogClickedSub.unsubscribe()
  }

}
