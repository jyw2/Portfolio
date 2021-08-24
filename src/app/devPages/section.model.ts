import { BlogData } from "./blogData.model";
export class Section{
  public selected:boolean
  constructor(public name:string,public blogs: BlogData[]){
    this.selected = false;
  }
}
