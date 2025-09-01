import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product,ItemUpdate } from '../../../interfaces/interfaces';
import { SizeTextPipe } from '../../../Pipes/Size-text.pipe';

@Component({
  selector: 'order-item',
  imports: [SizeTextPipe],
  templateUrl: './order-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderItemComponent {

  product = input.required<Product>();
  itemUpdate = output<ItemUpdate>()

  updateQuantity(quantityUpdate: number){

    const update = {
      quantityUpdate,productName: this.product().name,productSize: this.product().size
    };

    this.itemUpdate.emit(update);

  }
}
