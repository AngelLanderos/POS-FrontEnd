import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product, Sizes } from '../../interfaces/interfaces';

@Component({
  selector: 'product-grid',
  imports: [ProductCardComponent],
  templateUrl: './product-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGridComponent {

      newProduct = output<Product>();


  productCategory = signal<Product[]>([
    {
      name: 'Mojito de frutos rojos',
      price: 120,
      size: 'large',
      quantity: 0,
    },
    {
      name: 'Cubanito',
      price: 100,
      size: 'large',
      quantity: 0,
    },
    {
      name: 'Piña Colada',
      price: 80,
      size: 'large',
      quantity: 0,
    },
    {
      name: 'Michelada',
      price: 100,
      size: 'large',
      quantity: 0,
    },
    {
      name: 'Cuba Don Julio',
      price: 150,
      size: 'large',
      quantity: 0,
    },
    {
      name: 'Extintor',
      price: 350,
      size: 'large',
      quantity: 0,
    },
  ]);

addProduct(product: Product){
    this.newProduct.emit(product);
}

}
