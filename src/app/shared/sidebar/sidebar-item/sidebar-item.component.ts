import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-item',
  imports: [],
  templateUrl: './sidebar-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarItemComponent { }
