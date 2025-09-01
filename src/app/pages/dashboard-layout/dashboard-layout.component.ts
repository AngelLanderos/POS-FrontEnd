import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ProductGridComponent } from '../../sales/product-grid/product-grid.component';
import { OrderSumaryComponent } from '../../sales/order-sumary/order-sumary.component';
import { Product } from '../../interfaces/interfaces';

@Component({
  selector: 'app-dashboard-layout',
  imports: [SidebarComponent, NavbarComponent, ProductGridComponent, OrderSumaryComponent],
  templateUrl: './dashboard-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {

  productToAdd = signal<Product | null>(null);

}
