import { useEffect, useState } from 'react';
import ReusableTable from './ReusableOrdersTable';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../store/hook';
import styled from "@emotion/styled";
import { Align } from '../../../../types/table';
import { deleteFleet, fetchFleets, updateFleet } from '../../../../store/fleetSlice';
import { Fleet, FleetPayload, FleetUpdatePayload } from '../../../../types/fleet';
import { FleetDialog } from '../../../admin/components/dialog/Fleet';
import { NoDataAvailable } from '../EmptyPage';

const FleetActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`
const FleetTable = () => {
  const dispatch = useAppDispatch();
  const [selectedFleet, setSelectedFleet] = useState<null | Fleet>(null);
  const { data } = useAppSelector((state) => state.fleet)
  const [open, setOpen] = useState(false);
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


  useEffect(() => {
    dispatch(fetchFleets())
  }, []);



  const FleetColumns = [
    // { title: "Sn", dataIndex: "sn", key: "sn", width: '100px' },
    { title: "Name", dataIndex: "name", key: "name", width: '100px' },
    { title: "No.Of.Drivers", dataIndex: "total_drivers", key: "drivers", width: '100px' },
    { title: "Email", dataIndex: "email", key: "email", width: '100px' },
    { title: "No.Of.Shops", dataIndex: "total_shops", key: "shops", width: '100px' },
    { title: "Phone", dataIndex: "phoneNumber", key: "phoneNumber", width: '100px' },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (item: Fleet) => (
        <FleetActions>
          <Button variant="contained" color="success" onClick={() => {
            setSelectedFleet((item))
            handleClickOpen(true)
          }}>Edit</Button>
          <Button variant="contained" color="error" onClick={() => {
            dispatch(deleteFleet(item.id))
          }}>Delete</Button>
        </FleetActions>
      ),
      width: '200px',
      align: Align.center,
    },
  ];

  return (<>{data.length ? <ReusableTable columns={FleetColumns} data={data} /> : <NoDataAvailable message={"No fleets available yet. Click 'Add Fleet' to create your first one!"}/>}
    {open && selectedFleet ? (<FleetDialog handleClickOpen={handleClickOpen} open={open} handleClose={handleClose} handleSave={handleSave} title={"Edit fleet"} initialData={{
      name: selectedFleet.name,
      email: selectedFleet.email,
      address: selectedFleet.address,
      password: selectedFleet.password,
      phoneNumber: selectedFleet.phoneNumber,
      username: selectedFleet.username,
    }} />) : null}</>);
};

export default FleetTable;
