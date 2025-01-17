import { useEffect, useState } from "react";
import { Align } from "../../../../types/table";
import ReusableTable from "./ReusableOrdersTable";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { ShopItem, ShopPayload, ShopUpdatePayload } from "../../../../types/shop";
import styled from "@emotion/styled";
import { NoDataAvailable } from "../EmptyPage";
import { deleteShop, fetchShops, updateShop } from "../../../../store/shopSlice";
import { fetchFleets } from "../../../../store/fleetSlice";
import { ShopDialog } from "../../../admin/components/dialog/Shop";

const ShopActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`
const ShopTable = () => {
  const { data } = useAppSelector((state) => state.shop)
  const [selectedShop, setSelectedShop] = useState<ShopItem | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchShops())
    dispatch(fetchFleets())
  }, []);
  const [open, setOpen] = useState(false);
  const handleSave = async (shop: ShopPayload) => {
    try {


      setOpen(false)
      if (selectedShop) {
        const payload: ShopUpdatePayload = { id: selectedShop.id, ...shop }
        dispatch(updateShop(payload))
      }
      setSelectedShop(null)
    } catch (error) {

    }
  };

  const handleClickOpen = (value: boolean) => {
    setOpen(value);
  };

  const handleClose = (_event: React.MouseEvent, reason: string) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };




  const ShopColumns = [
    { title: "Shop Name", dataIndex: "name", key: "name", width: "100px" },
    { title: "Address", dataIndex: "address", key: "address", width: "200px" },
    { title: "Warehouse location", dataIndex: "warehouse_address", key: "warehouseAddress", width: "200px" },
    { title: "Fleet Name", dataIndex: "fleetName", key: "fleetName", width: '100px' },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (item: ShopItem) => (
        <ShopActions>
          <Button variant="contained" color="success" onClick={() => {
            setSelectedShop(item)
            setOpen(true)
          }}>Edit</Button>
          <Button variant="contained" color="error" onClick={() => {
            dispatch(deleteShop(item.id))
          }}>Delete</Button>
        </ShopActions>
      ),
      width: "200px",
      align: Align.center,
    },
  ];

  return (<>
    {data.length ? (<ReusableTable columns={ShopColumns} data={data} />) : (<NoDataAvailable message="No shops available yet. Click 'Add new Shop' to set up your first shop today!" />)}
    {open && selectedShop ? (<ShopDialog handleClickOpen={handleClickOpen} open={open} handleClose={handleClose} handleSave={handleSave} title={"Edit fleet"} initialData={{
      name: selectedShop.name,
      warehouse_address: selectedShop.warehouse_address,
      address: selectedShop.address,
      fleet_id: selectedShop.fleet_id,
      username: selectedShop.name,
      password: "",
    }} />) : null}
  </>);
};

export default ShopTable;
