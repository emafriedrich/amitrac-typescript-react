import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core'
import { connect } from 'react-redux';
import { addTruckDriver } from '../../redux/affiliates/actions';
import AddTruckDriverModal from './addTruckDriverModal';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Nombre y apellido',
    width: 300,
    editable: true,
  },
];

function TruckDrivers({ selectedAffiliate }) {

  const [rows, setRows] = React.useState(selectedAffiliate?.truckDrivers || []);

  const [open, setOpen] = React.useState(false); 
  
  const addTruckDriver = () => {
    setOpen(true);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        onCellEditCommit={(params, event) => {
          console.log(params);
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

export default connect(mapStateToProps)(TruckDrivers);
