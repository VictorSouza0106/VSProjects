import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(key: string): string {
    try {
      if (key.includes('.')) {
        const keys: string[] = key.split('.');
        return this.translate.data[keys[0]][keys[1]] || key;
      }
      return this.translate.data[key];
    } catch (e) {
      console.log('Pipe Error - No Translate ->', e);

      return key;
    }
  }
}
