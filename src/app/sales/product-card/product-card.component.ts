import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product, Sizes } from '../../interfaces/interfaces';

@Component({
  selector: 'product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {

  currentProduct = input.required<Product>();
  newProduct = output<Product>();


  addProduct(product: Product, size: string) {

    let newProduct : Product = {
      name: product.name,
      price: product.price,
      size,
      quantity: 1
    }

    this.newProduct.emit(newProduct);

    newProduct = {
      name: '',
      price: 0,
      size: '',
      quantity: 0
    }

  }
}
