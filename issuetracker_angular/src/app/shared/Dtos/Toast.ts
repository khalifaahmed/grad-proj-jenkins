export class ToastModel {
  public visible: Boolean;

  public message: string;
  public type: ToastType;

  /**
   *
   */
  constructor(visible: boolean) {
    this.visible = visible;
    this.type = ToastType.Info;
    this.message = 'Information';
  }
}

export enum ToastType {
  Warning = 'bg-warning',
  Error = 'bg-danger',
  Info = 'bg-info',
  Success = 'bg-success',
}
