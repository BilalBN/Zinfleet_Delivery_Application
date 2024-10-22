import ReusableTable from './ReusableOrdersTable'; 
import { Button } from '@mui/material';

const FleetTable = () => {
  const data=[
    {
      sn:"1",
      name:"Quickship",
      address:'Prestige Ozone',
      drivers: 12,
      email:"quickship@gmail.com",
      shops:12,
      phone:'+919453889019'
    },
    {
      sn:"2",
      name:"expresszone",
      address:'Church street, Saudi',
      drivers: 12,
      email:"expresszone@gmail.com",
      shops:12,
      phone:'+919453889019'
    },
    {
      sn:"3",
      name:"expresszone",
      address:'All store,  Dubai',
      drivers: 12,
      email:"swift.ship@gmail.com",
      shops:12,
      phone:'+919453889019'
    },
    {
      sn:"4",
      name:"urban move",
      address:'All Rolla street, Dubai',
      drivers: 12,
      email:"quickship@gmail.com",
      shops:12,
      phone:'+919453889019'
    }
  ]

  const FleetColumns = [
    { title: "Sn", dataIndex: "sn", key: "sn", width: '100px' },
    { title: "Name", dataIndex: "name", key: "name", width: '100px' },
    { title: "No.Of.Drivers", dataIndex: "drivers", key: "drivers", width: '100px' },
    { title: "email", dataIndex: "email", key: "email", width: '100px' },
    { title: "No.Of.Shops", dataIndex: "shops", key: "shops", width: '100px' },
    { title: "Phons", dataIndex: "phone", key: "phone", width: '100px' },
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

  return <ReusableTable columns={FleetColumns} data={data} />;
};

export default FleetTable;
