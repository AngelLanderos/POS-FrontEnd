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
import { productCategoryService } from '../../services/productCategory.service';

@Component({
  selector: 'order-summary',
  imports: [OrderItemComponent, CurrencyPipe],
  templateUrl: './order-sumary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSumaryComponent {

  productCategoryService = inject(productCategoryService);
  newProduct = input.required<Product | null>();
  products = signal<Product[]>([]);

  // ✅ Agregar producto
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
    this.products.update((current) =>
      current.filter((p) => p.quantity > 0)
    );
  });

  // ✅ Total siempre actualizado automáticamente
  total = computed(() =>
    this.products().reduce((acc, p) => acc + p.price * p.quantity, 0)
  );

  // ✅ Actualizar item sin mutar el array
  updateItem(updateItem: ItemUpdate) {
    this.products.update((current) => {
      return current
        .map((item) =>
          item.name === updateItem.productName &&
          item.size === updateItem.productSize
            ? { ...item, quantity: item.quantity + updateItem.quantityUpdate }
            : item
        )
        .filter((item) => item.quantity > 0); // 👈 limpieza directa aquí
    });
  };

  test(){
    this.productCategoryService.getProductCategories().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
