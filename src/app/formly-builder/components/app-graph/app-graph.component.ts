import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
// import { curveBundle, curveCardinal, curveLinear, curveNatural, curveStep, curveStepAfter, curveStepBefore } from 'd3-shape';

/* 
import {
  AppGraphCurves,
  AppGraphConfiguration,
  ClusterNode,
  Edge,
  MiniMapPosition,
  Node
} from './models/app-graph.models';
 */

@Component({
  selector: 'app-graph',
  templateUrl: './app-graph.component.html',
  styleUrls: ['./app-graph.component.scss']
})
export class AppGraphComponent { // implements OnDestroy, OnInit {
/*   @Input() public edges: Edge[] = [];
  @Input() public nodes: Node[] = [];
  @Input() public clusters?: ClusterNode[];
  @Input() public curve?: AppGraphCurves;
  @Input() public graphConfiguration?: AppGraphConfiguration;
  @Input() public centerGraph$?: Subject<boolean>;
  @Input() public updateGraph$?: Subject<boolean>;
  @Input() public zoomToFit$?: Subject<boolean>;

  public configuration: AppGraphConfiguration;
  public graphCurve: any;

  private _subscriptions: Subscription[];

  constructor() {
    this._subscriptions = [];

    this.configuration = {
      autoCenter: true,
      autoZoom: true,
      enableZoom: true,
      panningEnabled: true,
      panOnZoom: true,
      zoomLevel: 1.0,
      zoomSpeed: 0.1,
      minZoomLevel: 0.1,
      maxZoomLevel: 4.0,
      miniMapMaxWidth: 100,
      miniMapMaxHeight: 100,
      miniMapPosition: MiniMapPosition.UpperRight
    };
  }

  ngOnInit() {
    Object.assign(this.configuration, this.graphConfiguration);

    this.setGraphCurve();

    if (this.updateGraph$) {
      this._subscriptions.push(this.updateGraph$.subscribe(value => {
        if (value) {
          if (this.graphConfiguration) {
            Object.assign(this.configuration, this.graphConfiguration);
          }

          this.setGraphCurve();
        }
      }));
    }
  }

  ngOnDestroy() {
    this._subscriptions.forEach(x => x.unsubscribe());
  }

  setGraphCurve() {
    switch (this.curve) {
      case AppGraphCurves.Cardinal:
        this.graphCurve = curveCardinal;
        break;
      case AppGraphCurves.Linear:
        this.graphCurve = curveLinear;
        break;
      case AppGraphCurves.Natural:
        this.graphCurve = curveNatural;
        break;
      case AppGraphCurves.Step:
        this.graphCurve = curveStep;
        break;
      case AppGraphCurves.StepBefore:
        this.graphCurve = curveStepBefore;
        break;
      case AppGraphCurves.StepAfter:
        this.graphCurve = curveStepAfter;
        break;
      case AppGraphCurves.Bundle:
      default:
        this.graphCurve = curveBundle.beta(1);
        break;
    }
  } */
}
