import { Injectable } from '@angular/core';
import { Section } from "./section.model";
import { BlogData } from "./blogData.model";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class BlogService{

  private sections: Section[] = [];
  private blogs: { [key: string]: any } = {};
  private selectedId:string = '';
  public closeAllSections = new Subject<null>();
  public blogClicked = new Subject<BlogData>();


  constructor(){
    // Define all sidebar sections and blog sections here!
    this.sections.push( new Section( 'Game Development', [
      new BlogData ('Fireball System', 'fireball', 'A showcase of my problem solving proccess.', '<p>I wanted to solve a problem: <br> How do 2d fighters (like street fighter) interpert\
      directional inputs from the player\
       like down-left-right-punch and turn them into fireballs?\
       <br> <a href="https://streetfighter.fandom.com/wiki/Inputs" target = "_blank">Background information on fighting game commands </a></p>\
\
      <img src="../assets/inputsystem/Streetfighter.jpg" alt="">\
\
      <p>I began by planning what the system would need. Other than the basic task of\
          correctly reading the inputs, the system would also have to:<br>\
          <br> 1. Only read inputs from a set number of seconds. <br>2. Excecute the special move even if the inputs are slightly wrong.\
           <br> 3. Control which special move is excecuted if two different patterns are inputted within the time frame.\
           <br>4. Not excecute a special move twice by accident.\
      </p>\
      <img src="../assets/inputsystem/img1.jpg" alt="">\
\
      <p>\
          Next, I brainstormed what data structures to use to store the inputs.\
          Removing from the beginning of a normal array and shifting would cause a very large big O time, so that was not an option.\
          A hashmap did not have the order that I needed.\
          A linked list would work, but another idea I had seen in a midterm exam question proved better.</p>\
      <p>\
          The idea was: an array that itself did not shift, but what you considered the end and beginning of the array did.\
          I stored the newest input in the array at the index held in the variable end.\
          The oldest input would be in the array at the index held in the variable beg.\
          Whenever an input was added, it would replace the value at index beg and the two indeces would shift right one.\
      </p>\
      <img src="../assets/inputsystem/img2.jpg" alt="">\
\
      <p>\
          I continued planning by figuring out how to solve each of the aformentioned\
          additional requirements.\
      </p>\
      <img src="../assets/inputsystem/img3.jpg" alt="">\
\
      <p>\
          For requirement 1, (Set input time frames for the player) I decided to\
          remove the oldest input every few milliseconds. This was done by\
          adding an input to the array that would not be recognized as valid (None).\
      </p>\
      <img src="../assets/inputsystem/img3.1.JPG" alt="">\
\
      <p>\
          To complete requirement 2, (allow slightly off commands) I used a "checklist" system when reading the array for valid special move commands.\
          Each special move had a "checklist" of inputs it needed to see before it could be excecuted. Each time an input\
          on the checklist was seen, it would be "checked". <br><br>\
          An input on the checklist could not be checked until all previous inputs on the checklist had already been checked.\
          This ensured the order of the command was correct while also allowing incorrect inputs to be inbetween the correct ones.\
      </p>\
      <img src="../assets/inputsystem/img 3.2.JPG" alt="">\
\
      <p>\
          For requirement 3 (dont excecute two commands), I simply placed a priority system for each special move. If two moves were read from the array at once,\
          only the higher priority move would excecute.\
      </p>\
      <img src="../assets/inputsystem/img3.3.JPG" alt="">\
\
      <p>\
          To solve requirement 4 (only excecute a command once), I removed all\
          inputs from the array and replaced them with None objects after any special move was found.\
      </p>\
\
      <h2></h2>\
      <p>\
          Next, I rounded out the planning stage with a general class outline.\
      </p>\
\
      <img src="../assets/inputsystem/img4.jpg" alt="">\
\
      <p>\
          After That I created some pseudo code.\
      </p>\
      <img src="../assets/inputsystem/img4.1.JPG" alt="">\
      <img src="../assets/inputsystem/img4.2.JPG" alt="">\
\
      <p>\
          Finally, after multiple refactors, the code below was created. I used Python 3 for the implementation.\
         Note: the implementation uses numpad fighting game notation, where each direction\
         is represented by a number. For more info click\
          <a href="http://www.dustloop.com/wiki/index.php/Notation" target = "_blank">here.</a>\
       <br>   The implemented code stores any special move as a class-\
      </p>\
      <img src="../assets/inputsystem/img5.JPG" alt="">\
\
      <p>\
          and the array( or stream ) as its own class.\
      </p>\
      <img src="../assets/inputsystem/img6.JPG" alt="">\
\
      <p>\
          It holds all the inputs in an array, and has a distinct beginning(the oldest\
          input) and end (the most recent input)\
          index. When an input is added, it is placed at the index of the beginning, replacing\
          the previous value. <br><br> The end and beg indeces are then shifted one to the right, which\
          shifts the new input to the end index and the oldest input to the beg index.\
          The beg and end indeces will also wrap back around to the left once they reach the end of the array.\
      </p>\
      <img src="../assets/inputsystem/img7.JPG" alt="">\
\
      <p>\
          The array will also replace the oldest input with an empty\
          input every few milliseconds. This creates the timing window for\
          the command to be excecuted by the player.\
      </p>\
      <img src="../assets/inputsystem/img8.1.JPG" alt="">\
      <img src="../assets/inputsystem/img8.2.JPG" alt="">\
\
      <p>The array and all special moves are held in a stream reader class.</p>\
      <img src="../assets/inputsystem/img9.JPG" alt="">\
\
      <p>\
          It looks for inputs when triggered by checking each input in the array against\
          the specific codes stored in each CMD (special move) class. If an input matches\
          the current targeted character in the code, the targeted code is shifted over or "checked".\
          Once the whole code has been checked for a CMD, it is added to a list of\
          found CMDS. <br><br> This way of "checklisting" the required codes allows the player to\
          input a slightly off code (such as down-up-right-left-punch where down-right-punch\
          is the code) and still get the desired special move.\
      </p>\
      <img src="../assets/inputsystem/img10.JPG" alt="">\
\
      <p>\
          The reader then checks for the priority of each code before outputing\
          the highest priority and most recent special move. This prevents the reader from outputting two\
          special moves on the same read.\
      </p>\
      <img src="../assets/inputsystem/img11.JPG" alt="">\
\
      <p>The array is then flushed to prevent the reader from reading the same array information twice\
          (which can result in unwanted specials being read) </p>\
          <img src="../assets/inputsystem/img12.JPG" alt="">\
\
\
      <p>\
\
          The resulting program works as follows:\
      </p>\
\
      <div id = "input_results">\
          <video src="../assets/inputsystem/inputsytemoutput.mp4" type = "video/mp4" controls></video>\
\
          <ul>\
              <li>First, the program Works as intended for all 3 codes.</li>\
              <li> Second, Input was down-up-right-downright-punch\
                  where the code needed was down-downright-right-punch. Fireball is still detected.</li>\
              <li> Third, fireball and dragon punch both inputed, but ONLY dragon punch\
                  is outputed as it has higher priority. </li>\
              <li>Lastly the timing window for inputting the whole code was passed,\
                  so no output is produced.</li>\
          </ul>\
\
      </div>\
\
      <p>\
          For more information and the full code, visit the <a href="https://github.com/jyw2/Input-System" target = "_blank">github repo.</a>\
      </p>'),
      new BlogData('Maya chain Generator','chain', 'A tool for Maya to generate custom Chain models built using python.', "<p>The following program I developed generates a Poly shape chain of links in Maya 2020.\
      you can choose the number of links, the length of the links and the thickness of the links.\
      The slider mins and maxes dynamically change to prevent the links from clipping. The links\
      are parented to the first link and renamed. A video demonstration can be seen below.\
      \
      \
  </p>\
\
  <video src='assets/Development Videos/2021-01-17 13-55-34.mp4' type = 'video/mp4' controls></video>\
\
  <p>This program uses a window class which first creates the UI.\
       This window also has an associated Chain class object. </p>\
       <img src='assets/MayaP_images/1.JPG' >\
\
  <p>The chain object has associated ring class objects stored in an array. The\
      first (root chain) remains at index 0 at all times.</p>\
      <img src='assets/MayaP_images/2.JPG' >\
\
  <p>The rectangular links(rings) are created from a torus shape that has four slightly stretched loops.\
  </p>\
  <img src='assets/MayaP_images/3.JPG' >\
\
  <p>\
      Every link is moved based on its position in the chain and its 2 radi.\
       The function that determines this distance is: \
       RingPosition*(ringRadius+(ringRadius - Thickness of a ring)). \
      Each link is also renamed and parented to the root ring.  \
  </p>\
  <img src='assets/MayaP_images/4.JPG' >\
\
  <p>\
      Whenever the slider is changed, the old chain is deleted and a new chain is created. This is quicky excecuted by deleting the root link and instancing a new Chain class. While the overhead\
      may be larger using this strategy VS moving and resizing each link, the implementation is much simpler and more clear. This allows for easier changes, troubleshooting, and teaching. I also reasoned that this program would not be used\
      during a runtime of a game, so its overhead would have less precedence over clarity.\
  </p>\
  <img src='assets/MayaP_images/5.JPG' >\
\
  <p>\
      Changing one of the radius or link radius effects the other's maxes/mins. \
      This is to prevent the links from colliding and clipping through each other.\
  </p>\
  <img src='assets/MayaP_images/6.JPG' >\
  <img src='assets/MayaP_images/6.5.JPG' >\
\
  <p>\
      The cancel button deletes the current root link, removing the chain of poly objects.\
  </p>\
  <img src='assets/MayaP_images/7.JPG' >\
\
  <p>\
      Confirming simply closes the UI window, leaving the chain to be used.\
      For the full code visit the <a href='https://github.com/jyw2/Maya-Python-Programs' target = '_blank'>project repository.</a> \
  </p>\
  <img src='assets/MayaP_images/8.JPG' '>"),
   new BlogData('Unreal Engine Pipeline', 'pipe','A workflow I produced for the creation of a 2 Dimensional fighting game. The workflow uses Unreal Engine 4 and Clipstudio Paint or Photoshop', " <p> I had the oppurtunity to lead a small team of four in the development of a 2D fighting game in Unreal Engine 4.\
   During that time, I developed many pipelines and templates to connect my \
artists and programmers. </p>\
<img src='assets/fighter/Intro.png' >\
\
<p> To assist the creation of animations, I synthesized and broke down the important animations needed for\
   every character.\
</p>\
<img src='assets/fighter/breakdowns.jpg' >\
\
<p>\
   I also created an animation workflow and templates for my artists to follow.\
   To do this I created templates for animation frames to keep consistant proportions and perspective.\
   I determined that 2048x2048 was the optimum size for sprites to retain quality while keeping file size low.\
   <br>Note: The background image used for screen size reference is not created by me, it is from the game: 'Guilty Gear XRD Rev2'\
\
</p><img src='assets/fighter/Animationbase.jpg' >\
<img src='assets/fighter/Backgroundsizetmplate.jpg' >\
\
<p>\
   These templates were created through extensive research in the strategies of other fighting games.\
   <span class = 'subtext'> Images taken from: Street fighter 3rd strike, Under Night In Birth, Skullgirls,\
        King of Fighters and Blazblue</span>\
</p>\
<img src='assets/fighter/Research.jpg' >\
\
<p>\
   The workflow conisted of roughing the animation keys in the template files, then painting tones\
   directly in black and white for inbetweens and keys, and finally outlining the edge for each frame.\
   We would then export each unique frame as a TGA file. The images were then proccessed into Unreal engine\
   'flipbooks' for runtime. Frames that ran for more than one FPS frame had timing manually changed\
   in engine to prevent the creation of multiple duplicate frames in storage.\
   The programs used included: Photoshop, Clipstudio and Krita.\
</p>\
<img src='assets/fighter/Workflow.jpg' >\
\
\
\
<p>\
   I also taught my artists to use a color pallete system and non-antiailising workflow.\
</p>\
<img src='assets/fighter/Color_grey_diant.jpg' >\
<img src='assets/fighter/ref.png' >\
\
<p>\
   The pallete system worked by\
mapping the specific pixel of shade on one black and white reference pallete to the colored\
pixel on the colored reference pallete with the same x value. Using this map, it would replace any\
shade in the material with that specific value to the mapped color. A demonstration can be viewed below.\
The method was mainly derived from\
<a href='https://www.reddit.com/r/unrealengine/comments/6bkjnn/how_can_i_palette_swap_in_a_material/' target = '_blank'>a forum post</a>\
</p>\
<video src='assets/fighter/2021-01-11 14-09-26.mp4' type = 'video/mp4' controls></video>\
\
<p>\
   In order to keep a consistant style, I created reference sheets to draw from.\
</p>\
<img src='assets/fighter/stylef.png' >\
<img src='assets/fighter/scale.jpg' >")
    ]))
    this.sections.push( new Section( 'Web Development', [
      new BlogData ('Commision Site', 'comSite', 'My commission site which features a Node Express API based gallery, lazy loading and a price estimator.'+
      'The application was built using Angular, NodeJS and MongoDB and is hosted on a virtual private server using Apache2', '<p>The gallery feautures filters, randomization, image addition controlled by scrolling and smart image distribution to ensure the lengths of the two columns of images are always similar.</p><p>Visit the site <a href = "https://comSite.jyuenw.com">here.</a> <br> To see the full implementation, \
      visit the github repo <a href = "https://github.com/jyw2/comSiteRev4">here.</a> <br>\
      The outdated version of the site built using NodeJS, MongoDB <br>and vanilla CSS JS and HTML is available <a href = "https://oldCom.jyuenw.com">here</a></p>'),
      new BlogData ('Portfolio Site','portfolio', 'This portfolio site was built using Angular and is hosted on an Apache2 server.','<p> To see the full implementation, visit the github repo <a href = "">here.</a> </p>'),
      new BlogData ( 'Progress Tracker','grind','An app that helps you track and compare grind spots in the game Black Desert Online. It uses Angular, Bootstrap and MongoDB', '<p> The site features user authentication, statistics tools, and a map for easy use. </p>\
      <p>Visit the site <a href = "">here.</a> <br> To see the full implementation, \
      visit the github repo <a href = "">here.</a> </p>')
    ]))

    //takes all blogs and puts it in an object with it's id as it's key
    //for fast (o1) access using only the key
    //Also adds the index of the blogs section to the blog
    //NOTE: blogs referenced in blogs object are the same as the ones in sections
    // in other words if its changed in blogs it should change in sections [needs to be tested]
    let index = 0
    for (let section of this.sections){
      for( let blog of section.blogs){
        blog.sectionIndex = index;
        this.blogs[blog.id] = blog;
      }
      index += 1;
    }

  }

  getBlogClicked (){
    return this.blogClicked
  }

  emitBlogClicked(id:string){
    //tells blog to switch content
    //triggered by the sidebar elements
    this.blogClicked.next(this.blogs[id as string])
  }

  getCloseAll(){
    return  this.closeAllSections
  }

  closeAll(){
    //closes all sections
    this.closeAllSections.next()

  }


  getSection(id:string){
    //gets the section for a blog id
    return this.sections[this.blogs[id as string].sectionIndex as number]
  }

  unselectCurrent(){
    //if a section is selected make it unselected
    if (this.selectedId){
     this.getSection(this.selectedId).selected = false;
    }

  }

  select(id:string) {
    //selects the current section and returns it
    this.unselectCurrent()
    this.getSection(id).selected = true
    return this.blogs[(id as string)]
  }

  getBlogs(){
    return this.blogs;
  }


  getSections(){
    return this.sections;
  }
}
