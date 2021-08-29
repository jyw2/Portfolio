import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-gallery-filter',
  templateUrl: './gallery-filter.component.html',
  styleUrls: ['./gallery-filter.component.css']
})
export class GalleryFilterComponent implements OnInit {
  //Component that represents a filter option in a menu component

  //is the filter selected
  public selected:boolean = true

  //communication vars
  @Input() public tag:string = ''
  @Input() name:string = ''
  @Output() filterSelectedEmmiter = new EventEmitter<{ isSelected:boolean, tag:string}>();


  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    //toggles the visual box and sends an update to the menu component to edit the
    //selected tags.
    this.selected = !this.selected
    this.filterSelectedEmmiter.emit({ isSelected: this.selected, tag: this.tag})
  }

}
