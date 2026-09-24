import { Service } from '@angular/core';

@Service()
export class DateService {
    private months = ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня" ];

    ISOToBirthDate(iso: string) {
        const dateTime = iso.split('T');
        const date = dateTime[0].split('-');
        const month = parseInt(date[1]);
        const monthText = this.months[month - 1];

        return `${date[2]} ${monthText} ${date[0]}`;
    }

    monthTextToNumber(monthText: string) {
        const index = this.months.findIndex(m => m == monthText.toLowerCase());
        return index + 1;
    }

    BirthDateToISO(birthDate: string) {
        const values = birthDate.split(' ');
        const month = this.monthTextToNumber(values[1]);
        const iso = `${values[2]}-${month}-${values[0]}T12:00:00`;
    }

    ISOToISODate(iso: string) {
        const dateTime = iso.split('T');
        return dateTime[0];
    }

    ISOToDate(iso: string) {
        const dateTime = iso.split('T');
        const dateValues = dateTime[0].split('-').map(v => parseInt(v));
        const timeValues = dateTime[1].substring(0, 8).split(':').map(v => parseInt(v));
        const date = new Date(dateValues[0], dateValues[1] - 1, dateValues[2], timeValues[0], timeValues[1], timeValues[2]);        
        return date;
    }
}
