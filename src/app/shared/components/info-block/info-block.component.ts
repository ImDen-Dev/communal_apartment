import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-info-block',
  templateUrl: './info-block.component.html',
  styleUrls: ['./info-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoBlockComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit() {}

  redirectToLogin() {
    this.store.dispatch(new Navigate(['auth']));
  }
}
