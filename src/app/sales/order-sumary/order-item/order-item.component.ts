import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'order-item',
  imports: [],
  templateUrl: './order-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderItemComponent { }
