import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button, Switch } from "@material-ui/core";
import { connect } from "react-redux";
import AddTruckModal from "./addTruckModal";
import {
  saveTruckBaseData,
  setActiveTruck,
  updateImageTruckAction,
} from "../../redux/affiliates/actions";
import { api } from "../../api/constants";
import { changeTruckPhoto } from "../../api/affiliates";
import { setOpenAddTruckModal } from "../../redux/modals/actions";

function Trucks({
  selectedAffiliate,
  setActive,
  saveTruck,
  updateTruckImage,
  openAddTruckModal,
  setOpenAddTruckModal,
}) {
  const [update, setUpdate] = React.useState(false);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "patent",
      headerName: "Patente",
      width: 150,
      editable: true,
    },
    {
      field: "brand",
      headerName: "Marca",
      width: 150,
      editable: true,
    },
    {
      field: "vtvExpiration",
      headerName: "Expiración VTV",
      type: "date",
      width: 200,
      editable: true,
    },
    {
      field: "assuranceExpiration",
      headerName: "Expiración Seguro",
      type: "date",
      width: 200,
      editable: true,
    },
    {
      field: "patentExpiration",
      headerName: "Expiración patente",
      type: "date",
      width: 200,
      editable: true,
    },
    {
      field: "active",
      headerName: "Activo",
      type: "boolean",
      renderCell: (params) => {
        return (
          <Switch
            onChange={(event) => {
              setActive({ truckId: params.id, active: event.target.checked });
            }}
            checked={params.value}
          />
        );
      },
      width: 200,
    },
    {
      field: "truckImage",
      headerName: "Cambiar foto del camion",
      renderCell: (params) => {
        return (
          <>
            <div
              style={{
                backgroundImage: `url(${params.row.truckImage}`,
                width: 100,
                height: 100,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
            <input
              type="file"
              onChange={async (event) => {
                const formData = new FormData();
                formData.append("image", event.target.files[0]);
                const response = await api.post("/upload", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                });
                const filePath = response.data[0];
                const data = { truckId: params.row.id, truckImage: filePath };
                changeTruckPhoto(data).then((response) => {
                  console.log(response.data);
                  updateTruckImage(response.data);
                  alert("Imagen cambiada");
                  setUpdate(!update); // hack to force rerender image
                });
              }}
            ></input>
          </>
        );
      },
      width: 300,
    },
  ];

  const rows = selectedAffiliate?.trucks || [];

  const addTruck = () => {
    setOpenAddTruckModal(true);
  };

  return (
    <div style={{ height: 400, width: "100%", marginTop: "90px" }}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <h3>Camiones</h3>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        isCellEditable={false}
        onCellEditCommit={(params, event) => {
          if (params.field === "vtvExpiration") {
            saveTruck({
              id: params.id,
              vtvExpiration: params.value,
            });
          }
          if (params.field === "patentExpiration") {
            saveTruck({
              id: params.id,
              patentExpiration: params.value,
            });
          }
          if (params.field === "assuranceExpiration") {
            saveTruck({
              id: params.id,
              assuranceExpiration: params.value,
            });
          }
          if (params.field === "brand") {
            saveTruck({
              id: params.id,
              brand: params.value,
            });
          }
          if (params.field === "patent") {
            saveTruck({
              id: params.id,
              patent: params.value,
            });
          }
        }}
      />
      <Button onClick={addTruck}>Agregar camion</Button>
      <AddTruckModal open={openAddTruckModal} setOpen={setOpenAddTruckModal}></AddTruckModal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedAffiliate: state.affiliates.selectedAffiliate,
  openAddTruckModal: state.modals.openAddTruckModal,
});

const mapDispatchToProps = {
  setActive: setActiveTruck,
  saveTruck: saveTruckBaseData,
  updateTruckImage: updateImageTruckAction,
  setOpenAddTruckModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trucks);
