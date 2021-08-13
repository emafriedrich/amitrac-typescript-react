import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core'
import { connect } from 'react-redux';

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
  const rows = selectedAffiliate?.truckDrivers || [];
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
      <Button>Agregar camionero</Button>
    </div>
  );
}

const mapStateToProps = (state) => ({ selectedAffiliate: state.selectedAffiliate });

export default connect(mapStateToProps)(TruckDrivers);
