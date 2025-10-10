// account-details.component.ts
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/orderItems.service';
import { PaymetnsService } from '../../services/paymetns.service';
import { ItemsResponse } from '../../interfaces/interfaces';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-account-details',
  imports: [CurrencyPipe],
  templateUrl: './account-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDetailsComponent {
  // signals / estado
  currentTableId = signal<number>(0);
  tableItems = signal<ItemsResponse[]>([]);
  selectedQuantities = signal<Record<number, number>>({});
  paymentMethod = signal<string>('cash'); // ejemplo por defecto
  isProcessing = signal<boolean>(false);

  // inyecciones
  paymentService = inject(PaymetnsService)
  activatedRoute = inject(ActivatedRoute);
  orderService = inject(OrderService);

  ngOnInit() {
    this.currentTableId.set(
      +this.activatedRoute.snapshot.paramMap.get('tableId')!
    );

    this.loadItems();
  }

  private loadItems() {
    this.orderService.getOrdersItem(this.currentTableId()).subscribe({
      next: (res: ItemsResponse[]) => {
        this.tableItems.set(res);
        // resetear selecciones (no queremos mantener selecciones entre recargas)
        this.selectedQuantities.set({});
      },
      error: (error) => {
        console.error('Error al cargar items:', error);
      },
    });
  }

  // derivados
  selectedItems = computed(() => {
    const map = this.selectedQuantities();
    return this.tableItems()
      .filter((it) => (map[it.order_item_id] ?? 0) > 0)
      .map((it) => ({ ...it, selectedQty: map[it.order_item_id] ?? 0 }));
  });

  selectedCount = computed(() => this.selectedItems().length);

  selectedSubtotal = computed(() => {
    return this.selectedItems().reduce((sum, it) => {
      const qty = Number((it as any).selectedQty ?? 0);
      const unit = Number(it.unit_price ?? 0);
      return sum + unit * qty;
    }, 0);
  });

  // selección por ítem
  setSelectedQuantity(itemId: number, qty: number) {
    const item = this.tableItems().find((i) => i.order_item_id === itemId);
    const max = item ? Number(item.quantity) : 0;
    const newQty = Math.max(0, Math.min(qty, max));

    this.selectedQuantities.update((map) => {
      const copy = { ...map };
      copy[itemId] = newQty;
      return copy;
    });
  }

  increaseSelected(itemId: number) {
    const cur = this.selectedQuantities()[itemId] ?? 0;
    this.setSelectedQuantity(itemId, cur + 1);
  }

  decreaseSelected(itemId: number) {
    const cur = this.selectedQuantities()[itemId] ?? 0;
    this.setSelectedQuantity(itemId, cur - 1);
  }

  toggleFullSelection(item: ItemsResponse, event: Event) {
    const target = (event.target ?? event.currentTarget) as HTMLInputElement | null;
    const checked = !!(target && target.checked);

    this.selectedQuantities.update((map) => {
      const copy = { ...map };
      copy[item.order_item_id] = checked ? item.quantity : 0;
      return copy;
    });
  }

  isFullySelected(item: ItemsResponse) {
    return (this.selectedQuantities()[item.order_item_id] ?? 0) === item.quantity;
  }

  // Construye allocations desde la selección actual
  private buildAllocationsFromSelection() {
    return this.selectedItems().map((it: any) => {
      const qty = Number(it.selectedQty ?? 0);
      return {
        order_item_id: it.order_item_id,
        quantity: qty,
        // el backend debe recalcular precios; aquí solo enviamos amount informativo opcional
        amount: Number(it.unit_price ?? 0) * qty,
      };
    });
  }

  // Construye allocations para toda la mesa (todos los items pendientes)
  private buildAllocationsForAll() {
    return this.tableItems().map((it) => ({
      order_item_id: it.order_item_id,
      quantity: Number(it.quantity ?? 0),
      amount: Number(it.unit_price ?? 0) * Number(it.quantity ?? 0),
    }));
  }

  // Pagar solo los items seleccionados
  paySelected() {
    const allocations = this.buildAllocationsFromSelection();
    if (!allocations.length) {
      // nada para pagar
      return;
    }

    const payload = {
      table_id: this.currentTableId(),
      payment: {
        amount: allocations.reduce((s, a) => s + Number(a.amount || 0), 0),
        method: this.paymentMethod(),
      },
      allocations, // backend: { order_item_id, quantity, amount }
    };

    this.isProcessing.set(true);

    this.paymentService.paySelected(payload).subscribe({
      next: (res) => {
        // al completar, recargar items desde servidor (más seguro que hacer updates locales)
        this.loadItems();
        this.isProcessing.set(false);
      },
      error: (err) => {
        console.error('Error en paySelected:', err);
        this.isProcessing.set(false);
      },
    });
  }

  // Pagar todo lo pendiente de la mesa
  // payAll() {
  //   const allocations = this.buildAllocationsForAll();
  //   if (!allocations.length) return;

  //   const payload = {
  //     order_id: this.getOrderIdFromItems(),
  //     table_id: this.currentTableId(),
  //     payment: {
  //       amount: allocations.reduce((s, a) => s + Number(a.amount || 0), 0),
  //       method: this.paymentMethod(),
  //     },
  //     allocations,
  //   };

  //   this.isProcessing.set(true);

  //   this.orderService.payAll(payload).subscribe({
  //     next: (res) => {
  //       // después de pagar todo, recarga (espera backend haya marcado orden como cerrada)
  //       this.loadItems();
  //       this.isProcessing.set(false);
  //     },
  //     error: (err) => {
  //       console.error('Error en payAll:', err);
  //       this.isProcessing.set(false);
  //     },
  //   });
  // }

  // util: intentar inferir order_id desde los items (si la API lo incluye)
  // si no está disponible, backend puede recibir solo table_id y auto-asignar.
  // private getOrderIdFromItems(): number | null {
  //   const first = this.tableItems()[0];
  //   // ItemsResponse puede contener order_id si tu consulta lo devuelve
  //   return first ? (first.order_item_id ?? null) : null;
  // }
}
