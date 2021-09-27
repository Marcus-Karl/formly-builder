import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { NgxGraphModule } from '@swimlane/ngx-graph';

import { AppGraphComponent } from './app-graph.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    // NgxGraphModule
  ],
  declarations: [
    AppGraphComponent
  ],
  exports: [
    AppGraphComponent
  ],
  providers: []
})
export class AppGraphModule { }
