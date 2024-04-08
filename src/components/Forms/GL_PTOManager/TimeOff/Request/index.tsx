import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { RequestFormData, TORequestCombos } from './types';
import { MultiColumnComboBoxHandle } from '@progress/kendo-react-dropdowns';
import { WindowHandle } from '@progress/kendo-react-dialogs';
import { PTOManagerAPI } from '../../../../../APIs';
import { useUserContext } from '../../../../../context/AppContext';
import { formatClientDateTime } from '../../../../Utils/helpers';
import { AxiosError } from 'axios';
import FormModal from '../../../../FormModal';
import { HamburgerMenu } from '../../../../HamburgerMenu';
import { Loader } from '../../../..';
import CustomColComboBox from '../../../../CustomColComboBox';
import CustomizedDatePicker from '../../../../CustomizedDatePicker';
import { TimePicker } from '@progress/kendo-react-dateinputs';
import { TextArea } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { GenericDialog } from '../../../../NewConfirmationModal/GenericDialog';

interface FormProps {
  IDNo: number;
  title?: string;
  inTaskBar?: boolean;
  minimized?: boolean;
  parentGrid?: string;
  setShowRequestOffModal: (arg0: boolean) => void;
  fetchRequestsData: () => Promise<void>;
  selectedDate?: string;
}

function isValidValue(value: any) {
  if (value && value.trim()) {
    return true;
  }

  return false;
}

function validateTORequestForm(formState: any) {
  if (
    !isValidValue(formState.Entity?.EntityName) ||
    !formState.DateFrom ||
    !formState.DateTo
  ) {
    return false;
  }

  return true;
}

export const Form = React.memo(
  ({
    IDNo,
    minimized,
    setShowRequestOffModal,
    fetchRequestsData,
    selectedDate,
  }: FormProps) => {
    const { onCloseForm } = useUserContext();

    console.log('Selected Date: ', selectedDate);

    const [formData, setFormData] = useState<RequestFormData>({
      Entity: { EntityName: 'Gainer, Mike', IDNo: 0, Department: '' },
      PayCode: { PayCode: '' },
      RequestDT: new Date(),
      DateFrom: null,
      DateTo: null,
      TimeFrom: null,
      TimeTo: null,
      ResponseNotes: '',
      RequestNotes: '',
      ResponseDT: new Date(),
      ResponseCode: { key: '-1', name: 'Pending' },
      FullDay: 'Hourly',
      RequestStatus: 'Pending',
    });

    console.log(formData.DateFrom);

    const [dataTemplate, setDataTemplate] = useState<TORequestCombos>();
    const [stage, setStage] = useState<'MINIMIZED' | 'DEFAULT'>(
      minimized ? 'MINIMIZED' : 'DEFAULT'
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false);
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<'close' | 'delete' | undefined>(
      undefined
    );

    const isEdit = IDNo !== 0;

    const isEditable = formData.ResponseCode?.name !== 'Approved';

    const [errorModalText, setErrorModalText] = useState<{
      primaryMessage: string;
      secondaryMessage?: string;
    }>({
      primaryMessage: '',
      secondaryMessage: undefined,
    });
    const firstInputRef = useRef<MultiColumnComboBoxHandle>(null);
    const windowRef = useRef<WindowHandle>(null);

    async function fetchData(loadState: boolean) {
      setIsLoading(loadState);
      try {
        const data: TORequestCombos = await PTOManagerAPI.getTORequest(IDNo);
        setDataTemplate(data);
        console.log('Data Record', data.data.record);
        if (data.data.record) {
          const {
            DateFrom,
            DateTo,
            TimeFrom,
            TimeTo,
            RequestDT,
            ResponseDT,
            ResponseCode,
            EntityName,
            EntityID,
            IDNo: _id,
            PTOCode,
            RequestNotes,
            ResponseNotes,
          } = data.data.record!;

          setFormData((prev) => ({
            ...prev,
            RequestNotes,
            ResponseNotes,
            PayCode: { PayCode: PTOCode },
            Entity: { EntityName: EntityName, Department: '', IDNo: EntityID },
            ResponseCode:
              data.data.combos.PTOResponse.find(
                (item) => item.key === `${ResponseCode}`
              ) ?? null,
            DateFrom: DateFrom ? new Date(DateFrom ?? '') : null,
            DateTo: DateTo ? new Date(DateTo ?? '') : null,
            TimeFrom: TimeFrom ? new Date(TimeFrom ?? '') : null,
            TimeTo: TimeTo ? new Date(TimeTo ?? '') : null,
            RequestDT: RequestDT ? new Date(RequestDT ?? '') : null,
            ResponseDT: ResponseDT ? new Date(ResponseDT ?? '') : null,
          }));
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }

    useEffect(() => {
      fetchData(true);
    }, [IDNo]);

    useEffect(() => {
      setStage(minimized ? 'MINIMIZED' : 'DEFAULT');
    }, [minimized]);

    const onClose = () => {
      onCloseForm(IDNo, 'GL_PTOManager_TimeOffRequest');
      setConfirm(undefined);
      setShowRequestOffModal(false);
    };

    useEffect(() => {
      const pcInputEl = firstInputRef.current?.element;
      if (!pcInputEl || isEdit) return;

      const dropdownBtn = pcInputEl.querySelector('button');
      dropdownBtn?.click();
    }, [isEdit, isLoading]);

    const handleSave = async (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.preventDefault();

      const {
        DateFrom,
        DateTo,
        Entity,
        RequestDT,
        ResponseDT,
        TimeFrom,
        TimeTo,
        ResponseNotes,
        PayCode,
        ResponseCode,
        RequestNotes,
      } = formData;
      const payload = {
        RequestNotes,
        PTOCode: PayCode.PayCode,
        ResponseDT: ResponseDT ? formatClientDateTime(ResponseDT) : undefined,
        ResponseCode: ResponseCode?.key ? +ResponseCode.key : undefined,
        RequestStatus: ResponseCode?.name,
        DateFrom: DateFrom ? formatClientDateTime(DateFrom) : undefined,
        DateTo: DateTo ? formatClientDateTime(DateTo) : undefined,
        EntityName: Entity.EntityName || 'Gainer, Mike',
        EntityID: Entity.IDNo || 3053,
        RequestDT: RequestDT ? formatClientDateTime(RequestDT) : undefined,
        TimeFrom: TimeFrom ? formatClientDateTime(TimeFrom) : undefined,
        TimeTo: TimeTo ? formatClientDateTime(TimeTo) : undefined,
        ResponseNotes,
      };

      try {
        const saved = isEdit
          ? await PTOManagerAPI.patchTORequest(IDNo, payload)
          : await PTOManagerAPI.createTORequest(payload);

        if (saved) {
          fetchRequestsData();
          onClose();
        }
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          if (e.response?.data.validationField) {
            setErrorModalText({
              primaryMessage: 'Missing required field',
              secondaryMessage: `${e.response.data.validationField} is required!`,
            });
            return;
          }
        }

        setErrorModalText({
          primaryMessage: 'Error',
          secondaryMessage: `${e}`,
        });
      }
    };

    const handleClose = (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.preventDefault();
      setConfirm('close');
      onClose();
    };

    const handleDelete = async (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.preventDefault();

      if (IDNo) {
        setIsDeleting(true);
        const status = await PTOManagerAPI.deleteTORequest(IDNo);
        if (status) {
          fetchRequestsData();
          onClose();
        }
      }
    };

    const handleChange = (name: string, value: string | Date | number) => {
      setIsChanged(true);
      if (name === 'DateFrom') {
        setFormData((prev) => {
          const newDate = value as Date;
          return {
            ...prev,
            [name]: newDate,
            DateTo:
              prev.DateTo && prev.DateTo.getTime() >= newDate.getTime()
                ? prev.DateTo
                : newDate,
          };
        });
      } else if (name === 'DateTo') {
        const newDate = value as Date;
        setFormData((prev) => ({
          ...prev,
          [name]: newDate,
          DateFrom:
            prev.DateFrom && prev.DateFrom.getTime() <= newDate.getTime()
              ? prev.DateFrom
              : newDate,
        }));
      }

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    useEffect(() => {
      setIsValid(validateTORequestForm(formData));
    }, [formData]);

    useEffect(() => {
      if (selectedDate !== undefined) {
        handleChange('DateFrom', selectedDate);
      }
    }, [selectedDate]);

    return (
      <>
        <FormModal
          title="Time Off Request"
          onClose={handleClose}
          onSave={handleSave}
          onDelete={IDNo ? () => setConfirm('delete') : undefined}
          width={652}
          height={300}
          stage={stage}
          ref={windowRef}
          hamburgerMenu={
            isEdit ? (
              <HamburgerMenu
                parentElement={windowRef.current?.element!}
                items={[
                  {
                    itemName: 'Delete Record',
                    iconClass: 'trash',
                    className: 'text-red-400',
                  },
                ]}
                onItemClick={(_, index) => {
                  if (index === 0) {
                    setConfirm('delete');
                  }
                }}
              />
            ) : undefined
          }
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className=" border-[#d6d6d6] border-[1px]">
                <FormContainer>
                  <CustomForm>
                    <CustomForm.Title title="Request Details" />
                    <CustomForm.Content>
                      <div className="grid grid-cols-[238px_338px] gap-[10px]">
                        <div className="gap-y-[8px] flex flex-col w-fit">
                          <CustomColComboBox
                            comboBoxType="Employees"
                            width={238}
                            clearButton={false}
                            label="Employee"
                            fillMode={'outline'}
                            customColumns={[
                              { field: 'EntityName', width: 238 },
                              { field: 'DepartmentDesc', width: 150 },
                              { field: 'Position', width: 80 },
                            ]}
                            ref={firstInputRef}
                            tabIndex={101}
                            style={{ width: 238 }}
                            dataList={
                              dataTemplate?.data.combos.Employees.map(
                                (item) => ({
                                  ...item,
                                  Department: item.Department ?? '',
                                  Position: item.Position ?? '',
                                })
                              ) ?? []
                            }
                            textField="EntityName"
                            value={formData.Entity}
                            onChange={(e) => handleChange('Entity', e.value)}
                            placeholder={'Employee'}
                            disabled={isEdit}
                          />
                          <div className="gap-x-[8px] gap-y-[8px]  grid grid-cols-2 w-full flex-wrap">
                            <CustomColComboBox
                              comboBoxType="PayCodesTO"
                              width={115}
                              label="Code"
                              value={formData.PayCode}
                              onChange={(e) => handleChange('PayCode', e.value)}
                              tabIndex={102}
                              dataList={
                                dataTemplate?.data.combos.PayCodesTO ?? []
                              }
                              textField="PayCode"
                              placeholder={'Code'}
                              disabled={!isEditable}
                            />
                            <CustomizedDatePicker
                              label="Submitted"
                              value={formData.RequestDT}
                              onChange={(e) =>
                                handleChange('RequestDT', e.value as Date)
                              }
                              tabIndex={103}
                              disabled={true}
                            />
                            <CustomizedDatePicker
                              label="Date From"
                              value={formData.DateFrom}
                              onChange={(e) =>
                                handleChange('DateFrom', e.value as Date)
                              }
                              tabIndex={104}
                              disabled={!isEditable}
                            />
                            <CustomizedDatePicker
                              label="Date To"
                              value={formData.DateTo}
                              onChange={(e) =>
                                handleChange('DateTo', e.value as Date)
                              }
                              tabIndex={105}
                              disabled={!isEditable}
                            />
                            <TimePicker
                              label="Time From"
                              value={formData.TimeFrom}
                              onChange={(e) =>
                                handleChange('TimeFrom', e.value as Date)
                              }
                              tabIndex={106}
                              formatPlaceholder={{ hour: '__', minute: '__' }}
                              fillMode={'outline'}
                              disabled={!isEditable}
                            />
                            <TimePicker
                              label="Time To"
                              value={formData.TimeTo}
                              onChange={(e) =>
                                handleChange('TimeTo', e.value as Date)
                              }
                              tabIndex={107}
                              fillMode={'outline'}
                              formatPlaceholder={{ hour: '__', minute: '__' }}
                              disabled={!isEditable}
                            />
                          </div>
                        </div>

                        <div className="grid grid-rows-[1fr_auto] gap-[18px] w-full ">
                          <TextArea
                            value={formData.RequestNotes}
                            onChange={(e) =>
                              handleChange('RequestNotes', e.value)
                            }
                            tabIndex={108}
                            fillMode={'outline'}
                            placeholder="Notes"
                          />
                          <div className="flex h-[20px] items-center justify-start gap-4">
                            <div>
                              <span>Req: </span>
                              <span className="highlight">
                                {Number(0).toFixed(2)} Hrs
                              </span>
                            </div>

                            <div>
                              <span>Avail: </span>
                              <span className="highlight">
                                {dataTemplate?.availHours.toFixed(2)} Hrs
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CustomForm.Content>
                  </CustomForm>
                </FormContainer>

                <div className="flex items-end justify-end px-[15px] py-[10px]">
                  <div className="flex w-full justify-between">
                    <div
                      className={`flex items-center px-2 my-[5px] rounded text-white ${
                        formData.ResponseCode?.name === 'Pending'
                          ? 'bg-[#7F7F7F]'
                          : 'bg-[#FF7F27]'
                      }`}
                    >
                      {formData.ResponseCode?.name}
                    </div>
                    <div className="flex gap-3 items-center justify-end submit">
                      <Button
                        size="small"
                        tabIndex={198}
                        themeColor="primary"
                        disabled={!isValid || !isChanged}
                        onClick={handleSave}
                      >
                        <>
                          <u>S</u>ave
                        </>
                      </Button>
                      <Button
                        size="small"
                        tabIndex={199}
                        themeColor="primary"
                        onClick={handleClose}
                      >
                        <u>C</u>lose
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </FormModal>
        {confirm === 'close' && (
          <GenericDialog
            type="UnsavedClose"
            primaryMessage="Save record?"
            onConfirmed={() => {}}
            onCancel={() => setConfirm(undefined)}
            onClose={onClose}
          />
        )}

        {errorModalText.primaryMessage !== '' && (
          <GenericDialog
            type="Error"
            onClose={() => setErrorModalText({ primaryMessage: '' })}
            {...errorModalText}
          />
        )}

        {confirm === 'delete' && (
          <GenericDialog
            confirmButtonText={isDeleting ? 'Deleting' : 'Delete'}
            type="Confirmation"
            primaryMessage="Delete record?"
            onCancel={() => setConfirm(undefined)}
            onConfirmed={handleDelete}
          />
        )}
      </>
    );
  }
);

type ChildrenProp = { children: ReactNode };

const FormContainer = ({ children }: ChildrenProp) => {
  return <div className="time-off-form">{children}</div>;
};

const CustomForm = ({ children }: ChildrenProp) => {
  return <div>{children}</div>;
};

CustomForm.Title = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center px-[15px] highlight h-[40px] border-b-[1px] w-full">
      <span>{title}</span>
    </div>
  );
};

CustomForm.Content = ({ children }: ChildrenProp) => {
  return <div className="px-[15px] py-[10px] border-b-[1px]">{children}</div>;
};
