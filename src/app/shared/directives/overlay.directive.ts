import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LoaderComponent } from '../components/loader/loader.component';
import { SpinnerService } from '../services/spinner.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[overlayLoading]',
})
export class OverlayLoadingDirective implements OnInit {
  @Input('showBackdrop') showBackdrop: boolean = false;

  subscription: Subscription = new Subscription();
  private overlayRef!: OverlayRef;

  constructor(private host: ElementRef, private overlay: Overlay, private readonly spinnerService: SpinnerService) {}

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

    this.subscription = this.spinnerService.isLoading.subscribe((isLoading) => {
      if (isLoading) {
        this.overlayRef.attach(new ComponentPortal(LoaderComponent));
      } else {
        this.overlayRef.detach();
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.overlayRef.detach();
  }
}
