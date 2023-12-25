import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoBlockComponent } from '@shared/components';

@NgModule({
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [MaterialModule, FormsModule, ReactiveFormsModule],
  declarations: [InfoBlockComponent],
  providers: [],
})
export class SharedModule {}
