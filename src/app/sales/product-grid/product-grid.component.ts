import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'product-grid',
  imports: [ProductCardComponent],
  templateUrl: './product-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGridComponent { }
