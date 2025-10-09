import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/orderItems.service';
import { ItemsResponse } from '../../interfaces/interfaces';
import { CurrencyPipe } from '@angular/common';

interface test {
  id: number;
  quantity: number;
}

@Component({
  selector: 'app-account-details',
  imports: [CurrencyPipe],
  templateUrl: './account-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDetailsComponent {

  currentTableId = signal<number>(0);
  tableItems = signal<ItemsResponse[]>([]);
  selectedQuantities = signal<Record<number, number>>({});

  activatedRoute = inject(ActivatedRoute);
  orderService = inject(OrderService);

  ngOnInit() {
    this.currentTableId.set(
      +this.activatedRoute.snapshot.paramMap.get('tableId')!
    );

    this.orderService.getOrdersItem(this.currentTableId()).subscribe({
      next: (res) => {
        this.tableItems.set(res);
        // this.selectedQuantities.set(this.tableItems().map(item =>  ({id: item.order_item_id,quantity:0})))

        console.log(this.tableItems());
        console.log(this.selectedQuantities());
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

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

  //Funcion que altera la cantidad seleccionada, usada por las funciones que aumentan y reducen la cantidad
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

  toggleFullSelection(item: ItemsResponse, checked: any ) {
    this.selectedQuantities.update(map => {
      const copy = { ...map };
      copy[item.order_item_id] = checked ? item.quantity : 0;
      return copy;
    });
  }

   isFullySelected(item: ItemsResponse) {
    return (this.selectedQuantities()[item.order_item_id] ?? 0) === item.quantity;
  }

}
