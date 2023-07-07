import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastModel } from '../../Dtos/Toast';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnDestroy, OnInit {
  public toastModel!: ToastModel;

  private subscriptions!: Subscription;

  /**
   *
   */
  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscriptions = this.toastService.toastState.subscribe(
      (toastModel) => {
        this.toastModel = toastModel;
      }
    );
  }

  close(): void {
    this.toastModel.visible = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
