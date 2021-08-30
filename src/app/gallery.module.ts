import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'

import { GalleryComponent } from './gallery/gallery.component';
import { GalleryTileComponent } from './gallery/gallery-tile/gallery-tile.component';
import { GalleryMenuComponent } from './gallery/gallery-menu/gallery-menu.component';
import { GalleryFilterComponent } from './gallery/gallery-filter/gallery-filter.component';
import { OverlayComponent } from './overlay/overlay.component';

const routes: Routes = [
  { path: '', component: GalleryComponent}
]


@NgModule({
  declarations: [
    GalleryTileComponent,
    GalleryMenuComponent,
    GalleryFilterComponent,
    GalleryComponent,
    OverlayComponent
  ],
  exports:
    [GalleryComponent,
     OverlayComponent],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule.forChild(routes),
    HttpClientModule,
  ]
})
export class GalleryModule{ }
