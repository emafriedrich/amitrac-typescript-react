import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button, Switch } from "@material-ui/core";
import { connect } from "react-redux";

import AddTruckDriverModal from "./addTruckDriverModal";
import { saveTruckDriverBaseData, setActiveTruckDriver } from "../../redux/affiliates/actions";
import { setOpenAddTruckDriverModal } from "../../redux/modals/actions";

function TruckDrivers({
  selectedAffiliate,
  setActive,
  saveTruckDriver,
  setOpenAddTruckDriverModal,
  openAddTruckDriverModal,
}) {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Nombre y apellido",
      width: 300,
      editable: true,
    },
    {
      field: "active",
      headerName: "Activo",
      width: 300,
      renderCell: (params) => {
        return (
          <Switch
            onChange={(event) => {
              setActive({ truckDriverId: params.id, active: event.target.checked });
            }}
            checked={params.value}
          />
        );
      },
    },
  ];
  const rows = selectedAffiliate?.truckDrivers || [];

  const addTruckDriver = () => {
    setOpenAddTruckDriverModal(true);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
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
          });
        }}
      />
      <Button onClick={addTruckDriver}>Agregar camionero</Button>
      <AddTruckDriverModal open={openAddTruckDriverModal} setOpen={setOpenAddTruckDriverModal}></AddTruckDriverModal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedAffiliate: state.affiliates.selectedAffiliate,
    openAddTruckDriverModal: state.modals.openAddTruckDriverModal,
  };
};

const mapDispatchToProps = {
  setActive: setActiveTruckDriver,
  saveTruckDriver: saveTruckDriverBaseData,
  setOpenAddTruckDriverModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(TruckDrivers);
