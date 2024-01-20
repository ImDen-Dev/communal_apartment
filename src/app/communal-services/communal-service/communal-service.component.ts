import { booleanAttribute, Component, Input } from '@angular/core';
import { ServiceItems } from '@shared/models';

const ELEMENT_DATA: ServiceItems[] = [
  {
    current: '45004',
    previous: '45025',
    difference: '21',
    price: '37',
    unit: 'куб',
    calculation: '21 * 37',
    total: '304',
  },
];
@Component({
  selector: 'app-communal-service',
  templateUrl: './communal-service.component.html',
  styleUrls: ['./communal-service.component.scss'],
})
export class CommunalServiceComponent {
  @Input({ transform: booleanAttribute }) test = true;
  constructor() {
    console.log(this.test);
  }

  displayedColumns: string[] = [
    'current',
    'previous',
    'difference',
    'price',
    'calculation',
    'total',
    'star',
  ];
  dataSource: ServiceItems[] = ELEMENT_DATA;
  isEdit = false;
}
