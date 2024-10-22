import ReusableTable from "./ReusableOrdersTable";
import styled from "@emotion/styled";
const Comman=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
`
const Active=styled(Comman)`
    border-radius: 24px;
    color: #04009A;
    background-color: #ECECFF;
`
const InActive=styled(Comman)`
    border-radius: 24px;
    color: #CA0000;
    background-color: #FFCACA;
`
const data = [
    {
        id: 1,
        name: "Johnson",
        status: 'Active',
        address: "Richmond town Bangalore",
        vehicle: 'TATA PRIME',
        activeHours: 200,
        completedOrders: 100
    },
    {
        id: 2,
        name: "Antony",
        status: 'Inactive',
        address: "Richmond town Bangalore",
        vehicle: 'TATA PRIME',
        activeHours: 200,
        completedOrders: 100
    },
    {
        id: 3,
        name: "Christy",
        status: 'Active',
        address: "Richmond town Bangalore",
        vehicle: 'TATA PRIME',
        activeHours: 200,
        completedOrders: 100
    },
    {
        id: 4,
        name: "Christy",
        status: 'Active',
        address: "Richmond town Bangalore",
        vehicle: 'TATA PRIME',
        activeHours: 200,
        completedOrders: 100
    },
    {
        id: 5,
        name: "Christy",
        status: 'Active',
        address: "Richmond town Bangalore",
        vehicle: 'TATA PRIME',
        activeHours: 200,
        completedOrders: 100
    },
    {
        id: 6,
        name: "Christy",
        status: 'Active',
        address: "Richmond town Bangalore",
        vehicle: 'TATA PRIME',
        activeHours: 200,
        completedOrders: 100
    },
    {
        id: 7,
        name: "Christy",
        status: 'Active',
        address: "Richmond town Bangalore",
        vehicle: 'TATA PRIME',
        activeHours: 200,
        completedOrders: 100
    },
    {
        id: 8,
        name: "Christy",
        status: 'Active',
        address: "Richmond town Bangalore",
        vehicle: 'TATA PRIME',
        activeHours: 200,
        completedOrders: 100
    },
    {
        id: 9,
        name: "Christy",
        status: 'Active',
        address: "Richmond town Bangalore",
        vehicle: 'TATA PRIME',
        activeHours: 200,
        completedOrders: 100
    },
    {
        id: 10,
        name: "Christy",
        status: 'Active',
        address: "Richmond town Bangalore",
        vehicle: 'TATA PRIME',
        activeHours: 200,
        completedOrders: 100
    },
    {
        id: 11,
        name: "Christy",
        status: 'Active',
        address: "Richmond town Bangalore",
        vehicle: 'TATA PRIME',
        activeHours: 200,
        completedOrders: 100
    },
    {
        id: 12,
        name: "Christy",
        status: 'Active',
        address: "Richmond town Bangalore",
        vehicle: 'TATA PRIME',
        activeHours: 200,
        completedOrders: 100
    },
    {
        id: 13,
        name: "Christy",
        status: 'Active',
        address: "Richmond town Bangalore",
        vehicle: 'TATA PRIME',
        activeHours: 200,
        completedOrders: 100
    },
    {
        id: 14,
        name: "Christy",
        status: 'Active',
        address: "Richmond town Bangalore",
        vehicle: 'TATA PRIME',
        activeHours: 200,
        completedOrders: 100
    },

];

const CustomTable = () => {
    const ShopColumns = [   
        { title: "Name", dataIndex: "name", key: "name", width: '100px' },
        { title: "Address", dataIndex: "address", key: "address", width: '200px' }, 
        {
            title: 'Satus',
            dataIndex: 'status',
            key: 'status',
            render: (row: any) => (
                row.status==='Active'?<Active>Active</Active>:<InActive>InActive</InActive>
            ),
            width: '100px'
          },
        { title: "Vehicle", dataIndex: "vehicle", key: "vehicle", width: '200px' },
        { title: "Active Hours", dataIndex: "activeHours", key: "activeHours", width: '100px' },
        { title: "Completed Orders", dataIndex: "activeHours", key: "activeHours", width: '200px' },
       
      ];
    return (
        <ReusableTable columns={ShopColumns} data={data} />
    );
};

export default CustomTable;
