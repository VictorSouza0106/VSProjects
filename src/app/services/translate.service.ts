import { Injectable } from '@angular/core';
import { langPt } from '../../translates/pt-BR';
import { langEn } from '../../translates/en-US';

@Injectable()
export class TranslateService {
  data: any = langEn;

  use(lang: string): any {
    if (lang.includes('pt')) this.data = langPt;
  }
}
