import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hryvnia',
})
export class HryvniaPipe implements PipeTransform {
  transform(value: string | number, format: string = "text"): string {
    const symbol = "₴";
    // symbol || text

    if(format == "symbol") {
      const res = value + symbol;
      return res;
    } else {
      const res = value + " грн."
      return res;
    }
  }
}
