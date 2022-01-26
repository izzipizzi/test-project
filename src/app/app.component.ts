import { Component } from '@angular/core';
import { ToastService } from './shared/services/toast.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'test-project';
  constructor(private toastService: ToastService, private snackBar: MatSnackBar) {
    this.toastService.notification$.subscribe((message) => {
      this.snackBar.open(message);
    });
  }
}
