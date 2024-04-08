// import { AccountListType, EntityType } from '../../types';

import { AccountListType, EntityType } from '../../../types';

export interface IProductCombosData {
  IncomeAccounts?: AccountListType[];
  InventoryAccounts?: AccountListType[];
  ProductCategories?: ProductCategoryType[];

  ProductSizeUnits?: ProductUnitType[];
  ProductUnits?: ProductUnitType[];
  ProductWeightUnits?: ProductUnitType[];
  Vendors?: EntityType[];
}

export type ProductCategoryType = {
  CategoryCode?: string;
};

export type ProductUnitType = {
  SystemYN?: boolean;
  UnitCode?: string;
  UnitGroup?: string;
};
