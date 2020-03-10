import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {typeList} from '@core/constants/filters.const';

@Component({
  selector: 'lnr-category-multiselect',
  templateUrl: './category-multi-select.component.html',
  styleUrls: ['./category-multi-select.component.scss']
})
export class CategoryMultiSelectComponent implements OnInit {

  categories = typeList;
  categoriesTree = this.categories.map( cat => cat.categories.map( subCat => subCat.value));
  categoriesForm = {};

  @Input() inputSelectedCategories: string[] = [];
  @Output() multiSelectUpdate = new EventEmitter();

  ngOnInit() {
    const flatCat = [].concat(...this.categoriesTree);
    flatCat.forEach(cat => {
      this.categoriesForm[cat] = this.inputSelectedCategories ? this.inputSelectedCategories.includes(cat) : false;
    } );
  }

  handleMenuClick(ev) {
    ev.stopPropagation(); // prevent layout-header-menu from closing
  }

  toggleCategory(i) {
    this.categories[i].active  = !this.categories[i].active;
  }

  handleCategoryChange(i) {
    const nextState = !this.checkCategorySelected(i);
    this.categoriesTree[i].forEach(el => {
      this.categoriesForm[el] = nextState;
    });
    this.handleSubcategoryChange();
  }

  handleSubcategoryChange() {
    const selectedCategories = [];
    const formArray = Object.entries(this.categoriesForm);

    for ( const [key, value] of formArray) {
      if (value) { selectedCategories.push(key); }
    }

    this.multiSelectUpdate.emit(selectedCategories);
  }

  checkCategorySelected(i) {
    return this.categoriesTree[i].filter(el => this.categoriesForm[el]).length === this.categoriesTree[i].length;
  }

  checkIndeterminate(i) {
    return this.categoriesTree[i].filter(el => this.categoriesForm[el]).length > 0;
  }
}
