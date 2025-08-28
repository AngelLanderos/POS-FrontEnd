import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { OrderItemComponent } from './order-item/order-item.component';

@Component({
  selector: 'order-summary',
  imports: [OrderItemComponent],
  templateUrl: './order-sumary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSumaryComponent { }
