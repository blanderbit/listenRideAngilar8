import {Component} from "@angular/core";

@Component({
  template: `
  <span class="example-error">
  Some Error!!!
</span>
`,
  styles: [`
    .example-error {
      color: hotpink;
      margin-bottom: 5rem;
    }
  `],
})
export class SomeErrorComponent {}
