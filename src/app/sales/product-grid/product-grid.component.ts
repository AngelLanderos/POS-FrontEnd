import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import {
  Product,
  ProductResponse,
  ProductCategories,
  Sizes,
} from '../../interfaces/interfaces';
import { ProductService } from '../../services/product.service';
import { forkJoin } from 'rxjs';
import { ProductCategoryService } from '../../services/productCategory.service';

@Component({
  selector: 'product-grid',
  imports: [ProductCardComponent],
  templateUrl: './product-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGridComponent {
  productService = inject(ProductService);
  productCategoryService = inject(ProductCategoryService);

  newProduct = output<Product>();
  filterCategory = input.required<number>();

  allProducts = signal<ProductResponse[]>([]);
  filteredProducts = signal<ProductResponse[]>([]);
  productCategories = signal<ProductCategories[]>([]);

  getProductsEffect = effect(() => {
    forkJoin({
      products: this.productService.getProducts(),
      categories: this.productCategoryService.getProductCategories(),
    }).subscribe({
      next: (results) => {
        this.allProducts.set(results.products);
        this.productCategories.set(results.categories);
      },
      error: (error) => {
        console.error(error);
      },
    });
  });

  filterProductsEffect = effect(() => {
    const categoryId = this.filterCategory();
    const products = this.allProducts();

    if (categoryId && categoryId > 0) {
      this.filteredProducts.set(
        products.filter((product) => product.category.id === categoryId)
      );
    } else {
      // si no hay categoría seleccionada, mostrar todos
      this.filteredProducts.set(products);
    }
  });

  addProduct(product: Product) {
    this.newProduct.emit(product);
  }
}
