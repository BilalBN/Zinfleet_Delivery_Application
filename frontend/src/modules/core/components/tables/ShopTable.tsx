import ReusableTable from './ReusableOrdersTable'; 
import { Button } from '@mui/material';

const ShopTable = () => {
  const data=[
    {
      sn:"1",
      name:"Quickship",
      address:'Prestige Ozone',
      warehouseAddress:"quickship@gmail.com",
      fleetName:'+919453889019'
    },
    {
      sn:"2",
      name:"expresszone",
      address:'Church street, Saudi',
      warehouseAddress:"expresszone@gmail.com",
      fleetName:'+919453889019'
    },
    {
      sn:"3",
      name:"expresszone",
      address:'All store,  Dubai',
      warehouseAddress:"swift.ship@gmail.com",
      fleetName:'+919453889019'
    },
    {
      sn:"4",
      name:"urban move",
      address:'All Rolla street, Dubai',
      warehouseAddress:"quickship@gmail.com",
      fleetName:'+919453889019'
    }
  ]

  const ShopColumns = [
    { title: "Sn", dataIndex: "sn", key: "sn", width: '100px' },
    { title: "Shop Name", dataIndex: "name", key: "name", width: '100px' },
    { title: "Address", dataIndex: "address", key: "address", width: '200px' },
    { title: "Warehouse location", dataIndex: "warehouseAddress", key: "warehouseAddress", width: '200px' },
    { title: "Fleet Name", dataIndex: "fleetName", key: "fleetName", width: '100px' },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: () => (
        <div>
          <Button>View</Button>
          <Button>Edit</Button>
        </div>
      ),
      width: '200px'
    },
  ];

  return <ReusableTable columns={ShopColumns} data={data} />;
};

export default ShopTable;
