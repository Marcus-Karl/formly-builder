import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FieldType } from '@ngx-formly/material';
import { FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'display-html',
  templateUrl: './display-html.component.html',
  styleUrls: ['./display-html.component.scss']
})
export class DisplayHtmlComponent extends FieldType<FieldTypeConfig> implements AfterViewInit {

  constructor(
    private element: ElementRef,
    private location: Location,
    private router: Router) {
    super();
  }

  ngAfterViewInit() {
    for (let element of this.element.nativeElement.querySelectorAll('a.site-link')) {
      element.addEventListener('click', this.onNavigateClick.bind(this, element.attributes.getNamedItem('siteLink').nodeValue));
    }
  }

  private onNavigateClick(href: string) {
    let newPath = this.location.normalize(href);

    this.router.navigateByUrl(newPath);
  }
}
