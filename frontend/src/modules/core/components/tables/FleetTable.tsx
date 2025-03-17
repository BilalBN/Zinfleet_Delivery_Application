import { useEffect, useState } from 'react';
import ReusableTable from './ReusableTable';
import { useAppDispatch, useAppSelector } from '../../../../store/hook';
import styled from "@emotion/styled";
import { Align } from '../../../../types/table';
import { addCreditToFleet, deleteFleet, fetchFleets, setPage, updateFleet } from '../../../../store/fleetSlice';
import { Fleet, FleetPayload, FleetUpdatePayload } from '../../../../types/fleet';
import { FleetDialog } from '../../../admin/components/dialog/Fleet';
import { NoDataAvailable } from '../EmptyPage';
import { ActionType, MoreActionType } from '../../../../types/actions';
import MoreOptions from '../MoreMenu';
import { AddCredit } from '../../../admin/components/dialog/AddCredit';

const FleetOptions: MoreActionType[] = [
  {
    key: 'EDIT',
    title: 'Edit'
  },
  {
    key: 'DELETE',
    title: 'Delete'
  },
  {
    key: 'ADD',
    title: 'Add credit'
  }
]

const FleetActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`
const FleetTable = () => {
  const dispatch = useAppDispatch();
  const [selectedFleet, setSelectedFleet] = useState<null | Fleet>(null);
  const { data, page, limit, total, totalPages } = useAppSelector((state) => state.fleet)
  const [open, setOpen] = useState(false);
  const [addCreditOpen, setAddCreditOpen] = useState(false);

  const handleSave = async (fleet: FleetPayload) => {
    setOpen(false)
    if (selectedFleet) {
      const payload: FleetUpdatePayload = { id: selectedFleet.id, ...fleet }
      dispatch(updateFleet(payload))
    }
    setSelectedFleet(null)
  };

  const handleClickOpen = (value: boolean) => {
    setOpen(value);
  };

  const handleClose = (_event: React.MouseEvent, reason: string) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handAddCreditClickopen = (value: boolean) => {
    setAddCreditOpen(value);
  };

  const handleCreditClose = (_event: React.MouseEvent, reason: string) => {
    if (reason !== "backdropClick") {
      setAddCreditOpen(false);
    }
  };


  useEffect(() => {
    dispatch(fetchFleets())
  }, [page]);

  const updateCredit = (_value: number) => {
    setAddCreditOpen(false);
    if (selectedFleet) {
      const payload = { fleet_id: selectedFleet.id, creditAllocated: _value}
      dispatch(addCreditToFleet(payload))
    }
    setSelectedFleet(null)
  }



  const FleetColumns = [
    // { title: "Sn", dataIndex: "sn", key: "sn", width: '100px' },
    { title: "Name", dataIndex: "name", key: "name", width: '100px' },
    { title: "No.Of.Drivers", dataIndex: "total_drivers", key: "drivers", width: '100px' },
    { title: "Email", dataIndex: "email", key: "email", width: '100px' },
    { title: "No.Of.Shops", dataIndex: "total_shops", key: "shops", width: '100px' },
    { title: "Phone", dataIndex: "phoneNumber", key: "phoneNumber", width: '100px' },
    { title: "Total credit", dataIndex: "totalCredit", key: "totalCredit", width: '100px' },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (item: Fleet) => (
        <FleetActions>

          <MoreOptions options={FleetOptions} onClick={(action: ActionType) => {
            if (action === 'ADD') {
              setSelectedFleet((item))
              setAddCreditOpen(true)
            } else if (action === 'EDIT') {
              setSelectedFleet((item))
              handleClickOpen(true)
            } else if (action === 'DELETE') {
              dispatch(deleteFleet(item.id))
            }
          }} />
        </FleetActions>
      ),
      width: '200px',
      align: Align.center,
    },
  ];

  return (<>{data.length ? <ReusableTable
    total={total}
    totalPages={totalPages}
    columns={FleetColumns}
    data={data}
    page={page}
    setPage={(value: number) => {
      dispatch(setPage(value))
    }} rowsPerPage={limit} /> : <NoDataAvailable message={"No fleets available yet. Click 'Add new Fleet' to create your first one!"} />}
    {open && selectedFleet ? (<FleetDialog handleClickOpen={handleClickOpen} open={open} handleClose={handleClose} handleSave={handleSave} title={"Edit fleet"} initialData={{
      name: selectedFleet.name,
      email: selectedFleet.email,
      address: selectedFleet.address,
      password: selectedFleet.password,
      phoneNumber: selectedFleet.phoneNumber,
      username: selectedFleet.username,
    }} />) : null}
    {addCreditOpen && selectedFleet ? (<AddCredit handleClickOpen={handAddCreditClickopen} open={addCreditOpen} handleClose={handleCreditClose} handleSave={updateCredit} title={"Add Credit"} credit={0} />) : null}
  </>);
};

export default FleetTable;
