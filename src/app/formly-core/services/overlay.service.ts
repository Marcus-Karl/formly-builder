import { ComponentRef, ElementRef, EventEmitter, Injectable } from '@angular/core';
import { ConnectedPosition, FlexibleConnectedPositionStrategy, GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';

export interface Point {
  x: number;
  y: number;
}

export interface Config {
  disposeOnNavigation?: boolean;
  hasBackdrop: boolean;
  backdropClass?: string | string[];
  connectTo?: ElementRef | HTMLElement | Point & { width?: number; height?: number };
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  panelClass?: string | string[];
  positionOffsetX?: number;
  positionOffsetY?: number;
}

@Injectable({ providedIn: 'root' })
export class OverlayService {

  private readonly defaultConfig: Config = {
    disposeOnNavigation: true,
    hasBackdrop: true,
    backdropClass: 'dark-backdrop',
    connectTo: undefined,
    width: undefined,
    height: undefined,
    minWidth: undefined,
    minHeight: undefined,
    maxWidth: '100vw',
    maxHeight: '100vh',
    panelClass: undefined,
    positionOffsetX: undefined,
    positionOffsetY: undefined
  };

  constructor(private overlay: Overlay) { }

  getDefaultConfig(): Config {
    return Object.assign({}, this.defaultConfig);
  }

  openOverlay(ct: ComponentType<any>, config: Config = this.getDefaultConfig(), bindings?: { inputs?: { [key: string]: any }, outputs?: { [key: string]: () => any } }): OverlayRef {
    let overlayRef = this.createOverlay(config);

    let portal = new ComponentPortal(ct);

    let componentRef = overlayRef.attach(portal);

    this.setInstanceBindings(overlayRef, componentRef, bindings);

    return overlayRef;
  }

  close(overlayRef: OverlayRef) {
    if (!!overlayRef) {
      try {
        overlayRef.dispose();
      } catch (e) {
        console.error('Error disposing of OverlayRef', e);
      }
    }
  }

  private setInstanceBindings(overlayRef: OverlayRef, componentRef: ComponentRef<any>, bindings?: { inputs?: { [key: string]: any }, outputs?: { [key: string]: () => any } }) {
    let hasOutputDisposeBinding = false;

    if (componentRef.instance && bindings) {
      if (bindings.inputs) {
        Object.keys(bindings.inputs).forEach(key => {
          if (componentRef.instance.hasOwnProperty(key) && bindings.inputs && bindings.inputs[key]) {
            componentRef.instance[key] = bindings.inputs[key];
          }
        });
      }

      if (bindings.outputs) {
        Object.keys(bindings.outputs).forEach(key => {
          if (componentRef.instance.hasOwnProperty(key)) {
            if (componentRef.instance[key]?.subscribe) {
              (componentRef.instance[key] as EventEmitter<any>).subscribe(value => {
                if (bindings.outputs && bindings.outputs[key]) {
                  (bindings.outputs[key] as Function)(value);
                }
              });
            }

            if (key ==='dispose') {
              hasOutputDisposeBinding = true;
            }
          }
        });
      }
    }

    if (!hasOutputDisposeBinding && componentRef.instance?.dispose?.subscribe) {
      componentRef.instance.dispose.subscribe(() => this.close(overlayRef));
    }
  }

  private createOverlay(config: Config): OverlayRef {
    let overlayConfig: OverlayConfig = this.getOverlayConfig(config);

    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: Config): OverlayConfig {
    let positionStrategy: GlobalPositionStrategy | FlexibleConnectedPositionStrategy;
    let overlayConfig: OverlayConfig;

    if (config?.connectTo) {
      let positions = this.getDefaultPositions();

      positions.forEach(x => {
        x.offsetX = config.positionOffsetX || undefined;
        x.offsetY = config.positionOffsetY || undefined;
      });

      positionStrategy = this.overlay.position()
        .flexibleConnectedTo(config.connectTo)
        .withFlexibleDimensions(true)
        .withLockedPosition(false)
        .withPositions(positions);

      overlayConfig = new OverlayConfig({
        width: config.width,
        height: config.height,
        minWidth: config.minWidth,
        minHeight: config.minHeight,
        maxWidth: config.maxWidth,
        maxHeight: config.maxHeight,
        panelClass: config.panelClass,
        hasBackdrop: config.hasBackdrop,
        backdropClass: config.backdropClass,
        scrollStrategy: this.overlay.scrollStrategies.block(),
        positionStrategy
      });
    } else {
      positionStrategy = this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically();

      overlayConfig = new OverlayConfig({
        width: config.width,
        height: config.height,
        minWidth: config.minWidth,
        minHeight: config.minHeight,
        maxWidth: config.maxWidth,
        maxHeight: config.maxHeight,
        panelClass: config.panelClass,
        hasBackdrop: config.hasBackdrop,
        backdropClass: config.backdropClass,
        scrollStrategy: this.overlay.scrollStrategies.block(),
        positionStrategy
      });
    }

    return overlayConfig;
  }

  getDefaultPositions(): ConnectedPosition[] {
    return [
      { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'top' },
      { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'top' },
      { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' },
      { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'bottom' },
      { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'top' },
      { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'bottom' }
    ];
  }
}
