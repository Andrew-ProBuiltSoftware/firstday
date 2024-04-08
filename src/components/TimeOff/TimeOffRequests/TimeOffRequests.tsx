import { useState, useCallback, useRef, Dispatch } from 'react';
import { GridColumn as Column } from '@progress/kendo-react-grid';
import {
  filterBy,
  FilterDescriptor,
  orderBy,
  SortDescriptor,
} from '@progress/kendo-data-query';
import { MenuSelectEvent } from '@progress/kendo-react-layout';
import { RequestRecord } from './types';
import { SelectionType } from '../../../types';
import { SubGridListingTitleBar } from '../common/SubGridListingTitleBar';
import { Loader } from '../../../components';
import {
  ListingGrid,
  ListingGridContextMenu,
} from '../../../components/ListingView';
import { useUserContext } from '../../../context/AppContext';
import { DropDownButton } from '@progress/kendo-react-buttons';
import { Form } from '../../Forms/GL_PTOManager/TimeOff/Request';

interface TimeOffRequestsProps {
  isLoading: boolean;
  setData: Dispatch<React.SetStateAction<RequestRecord[]>>;
  fetchData: () => Promise<void>;
  data: RequestRecord[];
}

export const TimeOffRequests: React.FC<TimeOffRequestsProps> = ({
  data,
  fetchData,
  isLoading,
  setData,
}) => {
  const TITLE = 'Time-Off Requests';
  const [sort, setSort] = useState<SortDescriptor[]>([
    { dir: 'asc', field: 'DateRange' },
  ]);
  const [filter, setFilter] = useState<FilterDescriptor[]>([]);
  const [showContext, setShowContext] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<SelectionType>();
  const offset = useRef({ left: 0, top: 0 });
  const { onOpenForm } = useUserContext();
  const dropdownButtonRef = useRef<DropDownButton>(null);
  const [showRequestOffModal, setShowRequestOffModal] =
    useState<boolean>(false);
  const [IDNo, setIDNo] = useState(0);

  const handleContextMenuOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    offset.current = {
      left: e.pageX,
      top: e.pageY,
    };
    setShowContext(true);
  };

  const handleOnSelect = useCallback(
    (e: MenuSelectEvent) => {
      if (selectedItem) {
        const { field, dataItem } = selectedItem;
        switch (e.item.data.action) {
          case 'sortAsc':
            setSort([
              {
                dir: 'asc',
                field: field ?? '',
              },
            ]);
            break;
          case 'sortDesc':
            setSort([
              {
                dir: 'desc',
                field: field ?? '',
              },
            ]);
            break;
          case 'filterIn':
            if (field) {
              setFilter([
                {
                  field,
                  operator: 'eq',
                  value: dataItem[field],
                },
              ]);
            }
            break;
          case 'filterOut':
            if (field) {
              setFilter([
                {
                  field,
                  operator: 'neq',
                  value: dataItem[field],
                },
              ]);
            }
            break;
          case 'removeFilters':
            setFilter([]);
            break;
          default:
        }
      }
      setShowContext(false);
    },
    [selectedItem]
  );

  const handleShowModal = (IDNo: number) => {
    setIDNo(IDNo);
    setShowRequestOffModal(true);
  };

  return (
    <div className=" w-[420px] h-[797px] mr-[10px]">
      {showRequestOffModal && (
        <Form
          IDNo={IDNo}
          setShowRequestOffModal={setShowRequestOffModal}
          fetchRequestsData={fetchData}
        />
      )}
      <SubGridListingTitleBar title={TITLE}>
        <DropDownButton
          ref={dropdownButtonRef}
          onItemClick={(e) => {
            dropdownButtonRef.current?.element?.classList.remove(
              'button-active'
            );
            if (e.itemIndex === 0) {
              handleShowModal(0);
            } else if (e.itemIndex === 1) {
              onOpenForm(0, 'GL_PTOManager', 'GL_PTOManager_TimeOffTaken');
            }
          }}
          items={['Time-Off Request']}
          icon="plus"
          onOpen={() =>
            dropdownButtonRef.current?.element?.classList.add('button-active')
          }
          onClose={() =>
            dropdownButtonRef.current?.element?.classList.remove(
              'button-active'
            )
          }
          fillMode="outline"
          buttonClass="listing-action-button"
          popupSettings={{
            popupAlign: { horizontal: 'right', vertical: 'top' },
            anchorAlign: { horizontal: 'right', vertical: 'bottom' },
          }}
        />
      </SubGridListingTitleBar>
      <div className="h-[7px] border-x border-slate-300 bg-white"></div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ListingGrid
            data={filterBy(sort ? orderBy(data, sort) : data, {
              logic: 'and',
              filters: filter,
            })}
            sortable={true}
            sort={sort}
            onSortChange={(e) => {
              setSort(e.sort);
            }}
            onContextMenu={(event) => {
              handleContextMenuOpen(event.syntheticEvent);
              const { dataItem, field } = event;

              setData(
                data.map((item) => ({
                  ...item,
                  selected: item.IDNo === event.dataItem.IDNo,
                }))
              );

              setSelectedItem({ field, dataItem });
            }}
            dataItemKey="IDNo"
            onRowDoubleClick={(e) => {
              handleShowModal(e.dataItem.IDNo);
            }}
          >
            <Column
              field="DateRange"
              title="Date"
              width={120}
              className="text-center"
            />
            <Column
              field="PTOCode"
              title="Code"
              width={60}
              className="text-left"
            />
            <Column
              field="TimeRange"
              title="Time"
              width={120}
              className="text-center"
            />
            <Column
              field="RequestStatus"
              title="Status"
              width={100}
              className="text-left"
            />
          </ListingGrid>
          <ListingGridContextMenu
            show={showContext}
            offset={offset.current}
            onSelect={handleOnSelect}
            onClose={() => setShowContext(false)}
          />
        </>
      )}
    </div>
  );
};
