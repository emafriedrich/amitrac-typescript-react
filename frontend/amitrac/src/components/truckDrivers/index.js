import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Switch } from '@material-ui/core'
import { connect } from 'react-redux';

import AddTruckDriverModal from './addTruckDriverModal';
import { saveTruckDriverBaseData, setActiveTruckDriver } from '../../redux/affiliates/actions';


function TruckDrivers({ selectedAffiliate, setActive, saveTruckDriver }) {

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Nombre y apellido',
      width: 300,
      editable: true,
    },
    {
      field: 'active',
      headerName: 'Activo',
      width: 300,
      renderCell: (params) => {
        return (
          <Switch onChange={(event) => {
            setActive({ truckDriverId: params.id, active: event.target.checked });
          }} checked={params.value} />
        );
      }
    },
  ];
  const rows = selectedAffiliate?.truckDrivers || [];

  const [open, setOpen] = React.useState(false); 
  
  const addTruckDriver = () => {
    setOpen(true);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <h3>Camioneros</h3>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        onCellEditCommit={(params) => {
          saveTruckDriver({
            id: params.id,
            name: params.value,
          })
        }}
      />
      <Button onClick={addTruckDriver}>Agregar camionero</Button>
      <AddTruckDriverModal
        open={open}
        setOpen={setOpen}
      ></AddTruckDriverModal>
    </div>
  );
}

const mapStateToProps = (state) => ({ selectedAffiliate: state.selectedAffiliate });

const mapDispatchToProps = { setActive: setActiveTruckDriver, saveTruckDriver: saveTruckDriverBaseData };

export default connect(mapStateToProps, mapDispatchToProps)(TruckDrivers);
