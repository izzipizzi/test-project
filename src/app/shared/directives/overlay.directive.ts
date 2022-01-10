import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LoaderComponent } from '../components/loader/loader.component';
import { Observable } from 'rxjs';

@Directive({
  selector: '[overlayLoading]',
})
export class OverlayLoadingDirective implements OnInit {
  @Input('overlayLoading') isLoading!: Observable<boolean>;
  @Input('showBackdrop') showBackdrop: boolean = false;

  private overlayRef!: OverlayRef;

  constructor(private host: ElementRef, private overlay: Overlay) {}

  ngOnInit() {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.host)
      .withPositions([
        {
          originX: 'center',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'top',
        },
      ]);

    const overlayConfig = new OverlayConfig({
      hasBackdrop: this.showBackdrop,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
    });

    this.overlayRef = this.overlay.create(overlayConfig);

    this.isLoading.subscribe((isLoading) => {
      if (isLoading) {
        this.overlayRef.attach(new ComponentPortal(LoaderComponent));
      } else {
        this.overlayRef.detach();
      }
    });
  }
  ngOnDestroy() {
    this.overlayRef.detach();
  }
}
