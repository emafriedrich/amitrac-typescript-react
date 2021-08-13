import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core'
import { connect } from 'react-redux';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'patent',
    headerName: 'Patente',
    width: 150,
    editable: true,
  },
  {
    field: 'brand',
    headerName: 'Marca',
    width: 150,
    editable: true,
  },
  {
    field: 'vtvExpiration',
    headerName: 'Expiración VTV',
    type: 'date',
    width: 200,
    editable: true,
  },
  {
    field: 'assuranceExpiration',
    headerName: 'Expiración Seguro',
    type: 'date',
    width: 200
  },
  {
    field: 'patentExpiration',
    headerName: 'Expiración patente',
    type: 'date',
    width: 200
  },
];

function Trucks({ selectedAffiliate }) {
  const rows = selectedAffiliate?.trucks || [];
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
      <Button>Agregar camion</Button>
    </div>
  );
}

const mapStateToProps = (state) => ({ selectedAffiliate: state.selectedAffiliate });

export default connect(mapStateToProps)(Trucks);