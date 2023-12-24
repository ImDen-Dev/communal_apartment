import { Component } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  items = ['Водоканал', 'Нафтогаз', 'Електроенергія', 'Порядок в домі'];
  expandedIndex = 0;
}
