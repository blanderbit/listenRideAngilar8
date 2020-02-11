import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { typeList } from '@core/constants/filters.const';

@Component({
  selector: 'lnr-category-multiselect',
  templateUrl: './category-multi-select.component.html',
  styleUrls: ['./category-multi-select.component.scss']
})
export class CategoryMultiSelectComponent implements OnInit {

  showFilter = false;
  categories = typeList;
  categoriesTree = this.categories.map( cat => cat.subcategories.map( subcat => subcat.value));
  categoriesForm = {};

  @Output() multiSelectUpdate = new EventEmitter();

  constructor() { }

  ngOnInit() {
    const flatCat = [].concat(...this.categoriesTree);
    flatCat.forEach(cat => this.categoriesForm[cat] = false);
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  toggleCategory(i) {
    this.categories[i].active  = !this.categories[i].active;
  }

  handleCategoryChange(i) {
    this.categoriesTree[i].forEach(el => this.categoriesForm[el] = !this.categoriesForm[el]);
    this.toggleCategory(i);
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

  checkIndeterminate(i) {
    return this.categoriesTree[i].filter(el => this.categoriesForm[el]).length > 0;
  }
}
