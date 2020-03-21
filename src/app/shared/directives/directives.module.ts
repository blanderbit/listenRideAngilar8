import { NgModule } from '@angular/core';
import { AutofocusDirective } from '@shared/directives/autofocus.directive';
import { FocusFirstInvalidFieldDirective } from '@shared/directives/focus-first-invalid-field.directive';

const directives = [AutofocusDirective, FocusFirstInvalidFieldDirective];

@NgModule({
  declarations: [...directives],
  exports: [...directives],
})
export class DirectivesModule {}
