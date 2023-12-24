import { Component } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { AuthState, SignOut } from '@shared/states';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent {
  @Select(AuthState.isLoggedIn)
  isLoggedIn$: Observable<boolean>;

  date = new FormControl({ value: _moment(), disabled: true });

  constructor(private store: Store) {}
  onMonthSelected(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>,
  ): void {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  onSignOut() {
    this.store.dispatch(new SignOut());
  }
}
