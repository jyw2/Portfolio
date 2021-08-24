export class BlogData {
  public sectionIndex:number;
  constructor(public name:string, public id:string, public blurb:string, public content:string){
    this.sectionIndex = 0;
  }
}
