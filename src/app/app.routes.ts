import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './pages/dashboard-layout/dashboard-layout.component';
import { StatsLayoutComponent } from './layouts/stats-layout/stats-layout.component';
import { InventoryLayoutComponent } from './layouts/inventory-layout/inventory-layout.component';
import { PayrollLayoutComponent } from './layouts/payroll-layout/payroll-layout.component';
import { TableGridComponent } from './sales/table-grid/table-grid.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {path: 'sales',
        loadChildren: () => import('./sales/sales.route').then(m => m.SalesRoutes)
      },
      {path: 'stats',
        component: StatsLayoutComponent
      },
      {path: 'inventory',
        component: InventoryLayoutComponent
      },
      {path: 'payroll',
        component: PayrollLayoutComponent
      },
      {path: '**',
        redirectTo: 'sales'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
