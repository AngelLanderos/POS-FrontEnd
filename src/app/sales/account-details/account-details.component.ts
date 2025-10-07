import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-details',
  imports: [],
  templateUrl: './account-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDetailsComponent {

  currentTableId = signal<number>(0);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.currentTableId.set(+this.activatedRoute.snapshot.paramMap.get('tableId')!);
  }

}
