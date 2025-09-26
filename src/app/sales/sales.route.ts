import { Route, Routes } from "@angular/router";
import { ProductGridComponent } from "./product-grid/product-grid.component";
import { TableGridComponent } from "./table-grid/table-grid.component";
import { OrderLayoutComponent } from "./order-layout/order-layout.component";

export const SalesRoutes : Routes = [
  {
    path: '',
    component: TableGridComponent,
  },
  {
    path: 'orderSummary/:tableId',
    component: OrderLayoutComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

