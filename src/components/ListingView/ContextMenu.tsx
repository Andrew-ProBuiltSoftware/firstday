import {
  ContextMenu,
  ContextMenuProps,
  MenuItem,
} from '@progress/kendo-react-layout';

interface Props extends ContextMenuProps {}

export const ListingGridContextMenu = (props: Props) => {
  return (
    <ContextMenu {...props}>
      <MenuItem
        text="Sort Ascending"
        data={{
          action: 'sortAsc',
        }}
        icon="sort-asc-sm"
      />
      <MenuItem
        text="Sort Descending"
        data={{
          action: 'sortDesc',
        }}
        icon="sort-desc-sm"
      />
      <MenuItem
        text="Filter In Selected"
        data={{
          action: 'filterIn',
        }}
        icon="filter-sort-desc-sm"
      />
      <MenuItem
        text="Filter Out Selected"
        data={{
          action: 'filterOut',
        }}
        icon="filter-sort-asc-sm"
      />
      <MenuItem
        text="Remove All Filters"
        data={{
          action: 'removeFilters',
        }}
        icon="filter-clear"
      />
    </ContextMenu>
  );
};
