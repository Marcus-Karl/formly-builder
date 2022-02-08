import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Formly Builder';

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('system-en');
    this.translateService.addLangs(['es']);

    // this.translateService.use('en');
  }
}
