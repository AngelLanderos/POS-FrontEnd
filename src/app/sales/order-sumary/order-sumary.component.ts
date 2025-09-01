import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { ItemUpdate, Product } from '../../interfaces/interfaces';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'order-summary',
  imports: [OrderItemComponent, CurrencyPipe],
  templateUrl: './order-sumary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSumaryComponent {
  newProduct = input.required<Product | null>({});
  products = signal<Product[] | null>([]);

  addProductEffect = effect(() => {
    const product = this.newProduct();

    if (product) {
      this.products.update((current) => {
        // Buscamos si ya existe
        const index = current!.findIndex(
          (p) => p.name === product.name && p.size === product.size
        );

        if (index !== -1) {
          // Si existe, mapeamos y aumentamos la cantidad
          return current!.map((p, i) =>
            i === index ? { ...p, quantity: p.quantity + product.quantity } : p
          );
        } else {
          // Si no existe, lo agregamos al final
          return [...current!, product];
        }
      });
    }
  });

  deleteProductEffect = effect(() => {
    const updated = this.products();

    const filtered = this.products()!.filter((p) => p.quantity > 0);

    // Solo actualizamos si hubo algún cambio real
    if (filtered.length !== updated!.length) {
      this.products.set(filtered);
    }
  });

  updateItem(updateItem: ItemUpdate) {
    this.products.update((current) => {
      const findIndex = current!.findIndex(
        (item) =>
          item.name == updateItem.productName &&
          item.size == updateItem.productSize
      );

      console.log(findIndex);

      current![findIndex].quantity += updateItem.quantityUpdate;

      if (current![findIndex].quantity == 0) {
        current!.splice(findIndex, 1);
      }

      return current;
    });
  };

  total = computed(() =>
    this.products()!.reduce((acc, p) => acc + p.price * p.quantity, 0)
  );
}
