import { NgModule } from '@angular/core';
import { CurrencyPricePipe } from './Pipe/CurrencyPrice.pipe';

@NgModule({
  imports: [],
  declarations: [CurrencyPricePipe],
  exports: [CurrencyPricePipe]
})
export class PipeModule { }
