import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({providedIn: 'root'})

export class AppTitleStrategy extends TitleStrategy {
  constructor(private readonly titleService: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);
    const appName = 'Ilicitan Airlines';

    if (title !== undefined) this.titleService.setTitle(`${title} - ${appName}`);
    else this.titleService.setTitle(appName);
  }
}
