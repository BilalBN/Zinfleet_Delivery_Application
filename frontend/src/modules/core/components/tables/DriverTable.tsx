import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import ReusableTable from "./ReusableTable";
import styled from "@emotion/styled";
import { fetchDrivers, setPage } from "../../../../store/driverSlice";
import { NoDataAvailable } from "../EmptyPage";

const Comman = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
`
const Active = styled(Comman)`
    border-radius: 24px;
    color: #04009A;
    background-color: #ECECFF;
`
const InActive = styled(Comman)`
    border-radius: 24px;
    color: #CA0000;
    background-color: #FFCACA;
`

const CustomTable = () => {
    const dispatch = useAppDispatch();
    const { data, limit, page, total, totalPages } = useAppSelector((state) => state.driver)

    useEffect(() => {
        dispatch(fetchDrivers())
    }, [page]);

    const ShopColumns = [
        { title: "Name", dataIndex: "name", key: "name", width: '100px' },
        { title: "Address", dataIndex: "address", key: "address", width: '200px' },
        {
            title: 'Satus',
            dataIndex: 'status',
            key: 'status',
            render: (row: any) => (
                row.status === 'Active' ? <Active>Active</Active> : <InActive>InActive</InActive>
            ),
            width: '100px'
        },
        { title: "Vehicle", dataIndex: "vehicle_type", key: "vehicle", width: '200px' },
        { title: "Active Hours", dataIndex: "activeHours", key: "activeHours", width: '100px' },
        { title: "Completed Orders", dataIndex: "activeHours", key: "orderscompleted", width: '200px' },

    ];
    return (
        data.length ? (<ReusableTable total={total} totalPages={totalPages} columns={ShopColumns} data={data} page={page} setPage={(value: number) => {
            dispatch(setPage(value))
        }} rowsPerPage={limit} />) : (<NoDataAvailable message={"No drivers available yet. Click 'Add Driver' to get started!"} />)

    );
};

export default CustomTable;
