import styled from "@emotion/styled";
import { useAppSelector } from "../../../store/hook";
import ReusableTable from "../../core/components/tables/ReusableOrdersTable";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useState } from "react";
import { OrderDialog } from "./OrderDetailsDialog";
const Deleivered = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
   
`
const DeleiveredText = styled.div`
     color: #00CB25;
    font-size: 12px;
    cursor: pointer;
    text-decoration: underline;
`
const Undelivered = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   font-size: 12px;
`
const Return = styled.div`
    text-decoration: underline;
    color: red;
    font-size: 12px;
    cursor: pointer;

`
const ViewOtp = styled.div`
    text-decoration: underline;
    color: #04009A;
    font-size: 12px;
    cursor: pointer;
`

const ViewOption = styled.div`
    text-decoration: underline;
    color: #04009A;
    font-size: 12px;
    cursor: pointer;
`
const WarehouseOrdersTable = () => {
    const { data } = useAppSelector((state) => state.warehouse)
    const [open, setOpen] = useState(false);
    const handleClose = (_event: React.MouseEvent, reason: string) => {
        if (reason !== "backdropClick") {
            setOpen(false);
        }
    };

    const handleClickOpen = (value: boolean) => {
        setOpen(value);
      };

    const orderColumns = [
        { title: "Order ID", dataIndex: "order_id", key: "order_id", width: '100px' },
        { title: "Name", dataIndex: "name", key: "name", width: '100px' },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: '150px'
        },
        { title: "No. of Items", dataIndex: "no_of_items", key: "no_of_items", width: '150px' },
        { title: "Delivery location", dataIndex: "delivery_location", key: "delivery_location", width: '200px' },
        {
            title: "Item Details", dataIndex: "order_details", key: "order_details", width: '100px', render: (row: any) => (
                <ViewOption onClick={() => setOpen(true)}>View</ViewOption>
            ),
        },
        {
            title: "Status", dataIndex: "status", key: "status", width: '200px', render: (row: any) => (
                row.status === 'DELIVERED' ? <Deleivered>
                    <DeleiveredText>Deleivered</DeleiveredText>
                    <DoneAllIcon sx={{ color: "#00CB25" }} fontSize="small" /></Deleivered> : (<Undelivered>
                        <Return>Return</Return>
                        <ViewOtp>View OTP</ViewOtp>
                    </Undelivered>)
            ),
        },

    ];
    return (<>
        <ReusableTable columns={orderColumns} data={data} />
        <OrderDialog open={open} onClose={handleClose} handleClickOpen={handleClickOpen}/>
    </>);
};

export default WarehouseOrdersTable;
