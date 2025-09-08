import { ChangeDetectionStrategy, Component, effect, inject, output, signal } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product, Sizes } from '../../interfaces/interfaces';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'product-grid',
  imports: [ProductCardComponent],
  templateUrl: './product-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGridComponent {

  productService = inject(ProductService);
  newProduct = output<Product>();
  productCatalog = signal<Product[]>([]);

  getProductsEffect = effect(() => {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.productCatalog.set(res);
        console.log(res);
      }
    })
  })

    // {
    //   name: 'Mojito de frutos rojos',
    //   price: 120,
    //   size: 'large',
    //   quantity: 0,
    // },
    // {
    //   name: 'Cubanito',
    //   price: 100,
    //   size: 'large',
    //   quantity: 0,
    // },
    // {
    //   name: 'Piña Colada',
    //   price: 80,
    //   size: 'large',
    //   quantity: 0,
    // },
    // {
    //   name: 'Michelada',
    //   price: 100,
    //   size: 'large',
    //   quantity: 0,
    // },
    // {
    //   name: 'Cuba Don Julio',
    //   price: 150,
    //   size: 'large',
    //   quantity: 0,
    // },
    // {
    //   name: 'Extintor',
    //   price: 350,
    //   size: 'large',
    //   quantity: 0,
    // },


addProduct(product: Product){
    this.newProduct.emit(product);
}

}
