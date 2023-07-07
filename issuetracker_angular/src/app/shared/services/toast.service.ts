import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastModel, ToastType } from '../Dtos/Toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastState = new BehaviorSubject<ToastModel>(new ToastModel(false));

  constructor() {}

  show(
    message: string,
    seconds: number = 5,
    type: ToastType = ToastType.Info
  ): void {
    if (seconds <= 0 || seconds > 10) {
      seconds = 5;
    }

    let toast = new ToastModel(true);

    toast.message = message;
    toast.type = type;

    this.toastState.next(toast);

    setTimeout(() => {
      this.toastState.next(new ToastModel(false));
    }, seconds * 1000);
  }
}
