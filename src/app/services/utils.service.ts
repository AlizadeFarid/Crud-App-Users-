import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AlertOptions } from '../models/enums/alert-options';
import { MessageType, Position } from '../models/enums/swal-eunms';
import { DialogOptions } from '../models/enums/dialog-options';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private router: Router
  ) { }

  swAlert(title: string, options: Partial<AlertOptions>) {
    const Toast = Swal.mixin({
      toast: true,
      icon: options.messageType || MessageType.Info,
      position: options.position || Position.TopRight,
      showConfirmButton: options.hasConfirmButton || false,
      timer: options.delay || 3000,
      timerProgressBar: options.hasProgress || true,
      html: options.html,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    return Toast.fire({
      title: title,
    });
  }

  swDialog(options: Partial<DialogOptions>, CallBackFunc?: () => void) {
    const Dialog = Swal.mixin({
      title: options.title || 'Silmək istədiyinizdən əminsiniz?',
      icon: options.iconType || MessageType.Warning,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: options.confirmButtonText || 'Bəli sil!',
      cancelButtonText: options.cancelButtonText || 'Ləğv et!',
    });

    return Dialog.fire({}).then((result) => {
      if (result.isConfirmed) {
        CallBackFunc();
        Swal.fire(
          options.confirmDialogTitle || 'Silindi!',
          options.confirmDialogHtml,
          'success'
        );
      }
    });
  }
}




