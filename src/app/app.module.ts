import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {LayoutModule} from '@angular/cdk/layout'

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TileComponent } from './tile/tile.component';
import { SidebarComponent } from './devPages/sidebar/sidebar.component';
import { BlogSectionComponent } from './devPages/blog-section/blog-section.component';
import { TileHolderComponent } from './tile-holder/tile-holder.component';
import { BlogComponent } from './devPages/blog/blog.component';

import { Routes, RouterModule, Router} from '@angular/router';
import { SidebarElementComponent } from './devPages/sidebar-element/sidebar-element.component';
import { ContactComponent } from './contact/contact.component';



const appRoutes: Routes = [
  { path: '', component: TileHolderComponent},
  { path: 'dev', redirectTo: 'dev/fireball'}, //default page for /dev
  { path: 'dev/:blog', component: BlogSectionComponent},
  { path: 'vis', loadChildren: () => import('./gallery.module').then(m => m.GalleryModule)},
  { path: 'contact', component: ContactComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TileComponent,
    SidebarComponent,
    BlogComponent,
    BlogSectionComponent,
    TileHolderComponent,
    SidebarElementComponent,
    ContactComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
