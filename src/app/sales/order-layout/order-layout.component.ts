import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Product, ProductCategories } from '../../interfaces/interfaces';
import { ProductCategoryService } from '../../services/productCategory.service';
import { ProductGridComponent } from '../product-grid/product-grid.component';
import { OrderSumaryComponent } from '../order-sumary/order-sumary.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-layout',
  imports: [ProductGridComponent, OrderSumaryComponent
  ],
  templateUrl: './order-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderLayoutComponent {

  productCategoryService = inject(ProductCategoryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  productToAdd = signal<Product | null>(null);
  productCategories = signal<ProductCategories[]>([]);
  filter = signal<number>(0);
  currentTableId = signal<number>(0);

  ngOnInit() {
    this.currentTableId.set(+this.activatedRoute.snapshot.paramMap.get('tableId')!);

    this.productCategoryService.getProductCategories().subscribe({
      next: (res) => {
        this.productCategories.set(res);
      },
    });
  }

  goBack(){
    this.router.navigate(['/dashboard/sales']);
  }
}
