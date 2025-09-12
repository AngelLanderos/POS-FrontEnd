import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { BarTable } from '../../interfaces/interfaces';
import { CurrencyPipe } from '@angular/common';
import { AccountsService } from '../../services/accounts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'payment-modal',
  imports: [CurrencyPipe],
  templateUrl: './payment-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentModalComponent {
  accountService = inject(AccountsService);

  currentBarTable = input.required<BarTable>();

  payAccount(payment: number) {
    this.accountService
      .provitionalPayment(this.currentBarTable().table_number, payment)
      .subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Pago realizado con exito',
            icon: 'success',
            showConfirmButton: true,
            target: document.getElementById('my_modal_1'),
            confirmButtonColor: '#166534',
            confirmButtonText: 'Entendido'
          }).then(res => {
                 if(res.isConfirmed){
                   window.location.reload();
                 };
              });
        },
        error: (error) => {
          Swal.fire({
            title: 'Error creando orden',
            icon: 'error',
          });
        },
      });
  }
}
