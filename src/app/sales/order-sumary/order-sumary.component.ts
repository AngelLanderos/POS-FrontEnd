import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { OrderItemComponent } from './order-item/order-item.component';
import { ItemUpdate, Product } from '../../interfaces/interfaces';
import { CurrencyPipe } from '@angular/common';
import { ProductCategoryService } from '../../services/productCategory.service';
import { AccountsService } from '../../services/accounts.service';
import Swal from 'sweetalert2';
import { OrderService } from '../../services/orderItems.service';

@Component({
  selector: 'order-summary',
  imports: [OrderItemComponent, CurrencyPipe],
  templateUrl: './order-sumary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSumaryComponent {
  productCategoryService = inject(ProductCategoryService);
  accountService = inject(AccountsService);
  orderService = inject(OrderService);

  newProduct = input.required<Product | null>();
  tableNumber = input.required<number>();
  isBarSale = input.required<boolean>();

  products = signal<Product[]>([]);

  addProductEffect = effect(() => {
    const product = this.newProduct();

    if (product) {
      this.products.update((current) => {
        const index = current.findIndex(
          (p) => p.name === product.name && p.size === product.size
        );

        if (index !== -1) {
          return current.map((p, i) =>
            i === index ? { ...p, quantity: p.quantity + product.quantity } : p
          );
        } else {
          return [...current, product];
        }
      });
    }
  });

  // Eliminar productos con cantidad 0
  deleteProductEffect = effect(() => {
    this.products.update((current) => current.filter((p) => p.quantity > 0));
  });

  total = computed(() =>
    this.products().reduce((acc, p) => acc + p.price * p.quantity, 0)
  );

  updateItem(updateItem: ItemUpdate) {
    this.products.update((current) => {
      return current
        .map((item) =>
          item.name === updateItem.productName &&
          item.size === updateItem.productSize
            ? { ...item, quantity: item.quantity + updateItem.quantityUpdate }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  }

  createNewOrder() {
    const alertText = this.isBarSale()
      ? 'Confirmar venta en barra'
      : `Confirmar order para la mesa #${this.tableNumber()}`;

    const order = {
      products: this.products(),
      table: this.tableNumber(),
      total: this.total(),
    };

    Swal.fire({
      title: alertText,
      icon: 'question',
      showConfirmButton: true,
      confirmButtonColor: '#166534',
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonColor: '#dc2626',
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (res.isConfirmed) {
        if (this.isBarSale()) {

          this.orderService.createItemsForBarSale(this.products()).subscribe({
            next: (res) => {
              //TODO: TOAST notification
              setTimeout(() => {
                window.location.reload();
              }, 500);
            },
            error: (error) => {
              console.error(error);
            },
          });

        } else {

          this.accountService.createNewOrder(order).subscribe({
            next: (res) => {
              //TODO: TOAST notification
              setTimeout(() => {
                window.location.reload();
              }, 500);
            },
            error: (error) => {
              Swal.fire({
                title: 'Error creando orden',
                icon: 'error',
              });
              console.log(error);
            },
          });

        }
      }
    });
  }
}
