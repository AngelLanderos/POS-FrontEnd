import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TableService } from '../../services/table.service';
import { BarTable } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { BarTableStatusPipe } from '../../Pipes/BarTableStatus.pipe';

@Component({
  selector: 'table-grid',
  imports: [PaymentModalComponent,CurrencyPipe, BarTableStatusPipe],
  templateUrl: './table-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableGridComponent {

  router = inject(Router);
  tableService = inject(TableService);

  selectedStatus = signal<string>('all');
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

  tableGrid = computed(() => {
    const filter = this.selectedStatus().trim().toLowerCase();

    if(filter == 'all') return this.tables();

    if(filter == 'bar_sale') this.router.navigate(['/dashboard/sales/orderSummary',1])

    return this.tables().filter(table => table.status === filter);
  }
  )

  createOrder(tableId: number){
    this.router.navigate(['/dashboard/sales/orderSummary',tableId]);
  }

  showAccountDetails(tableId: number){
    this.router.navigate(['/dashboard/sales/accountDetails',tableId]);
  }

}
