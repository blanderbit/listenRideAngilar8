import { NgModule } from '@angular/core';
import { LinkComponent } from '@shared/components/links/link/link.component';
import { LinkListComponent } from '@shared/components/links/link-list/link-list.component';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

const links = [LinkComponent, LinkListComponent];

@NgModule({
  declarations: [...links],
  imports: [CommonModule, MatListModule, TranslateModule],
  exports: [...links],
})
export class LinksModule {}
