import { inject, Pipe, PipeTransform } from '@angular/core';
import { DateService } from '../services/date/date-service';

@Pipe({
  name: 'birthDate',
})
export class BirthDatePipe implements PipeTransform {
  private dateService = inject(DateService);

  transform(birthDate: string): string {
    // 1990-01-01T00:00:00
    return this.dateService.ISOToBirthDate(birthDate);
  }
}
