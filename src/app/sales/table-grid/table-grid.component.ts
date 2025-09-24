import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TableService } from '../../services/table.service';
import { BarTable } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';

@Component({
  selector: 'table-grid',
  imports: [PaymentModalComponent,CurrencyPipe],
  templateUrl: './table-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableGridComponent {

  router = inject(Router);
  tableService = inject(TableService);
  tables = signal<BarTable[]>([]);
  currentTable = signal<BarTable>({
    created_at: new Date(),
    id: 0,
    status: '',
    table_number: 0,
    provisionalTotal: 0
  });

  ngOnInit(){
    this.tableService.getTables().subscribe({
      next: (res) => {
        this.tables.set(res);
      },
      error: (error) => {

      }
    })
  }

  createOrder(tableId: number){
    this.router.navigate(['/dashboard/sales/orderSummary',tableId]);
  }

}
