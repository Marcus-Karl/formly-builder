import { Injectable } from '@angular/core';
import { MatIconRegistry, SafeResourceUrlWithIconOptions } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class CustomMatIcons {

  constructor(private matIconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIconResolver(this.customMatIconResolver)
  }

  customMatIconResolver = (name: string, namespace: string): SafeResourceUrl | SafeResourceUrlWithIconOptions | null => {
    switch (namespace) {
      case 'country-locale':
        return this.sanitizer.bypassSecurityTrustResourceUrl(`assets/images/country/flag/${name}.svg`);
      default:
        break;
    }

    return null;
  }
}
