import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './pages/dashboard-layout/dashboard-layout.component';
import { SalesLayoutComponent } from './layouts/sales-layout/sales-layout.component';
import { StatsLayoutComponent } from './layouts/stats-layout/stats-layout.component';
import { InventoryLayoutComponent } from './layouts/inventory-layout/inventory-layout.component';
import { PayrollLayoutComponent } from './layouts/payroll-layout/payroll-layout.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {path: 'sales',
        component: SalesLayoutComponent
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
