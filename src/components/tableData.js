import React, { useState } from "react";
import { Button, Paper, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getData, removeData } from "../operations/idb";
import { categoryList } from "../constants";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function TableData({ data, setData }) {
  const [selectedRows, setSelectedRows] = useState([]);

  // Function to handle the removal of data
  const handleRemoveData = async (key) => {
    try {
      const id = await removeData(key);
      console.log("Data removed with id:", id);

      // Refresh the data after removing
      const updatedData = await getData();
      setData(updatedData);
    } catch (error) {
      console.error("Error removing data:", error);
    }
  };

  // Function to handle the delete action for selected rows
  const handleDelete = () => {
    selectedRows.forEach((key) => {
      handleRemoveData(key);
    });
  };

  return (
    <Paper sx={{ height: 390, width: "100%", maxWidth: 650 }}>
      <DataGrid
        rows={data.map((row) => ({
          ...row,
          category: categoryList[row.category],
        }))}
        columns={["cost", "description", "category", "date"].map((field) => ({
          field,
          headerName: field.charAt(0).toUpperCase() + field.slice(1),
          width: 150,
        }))}
        pageSizeOptions={[5]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        onRowSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection);
        }}
        checkboxSelection
        sx={{ border: 0 }}
      />
      <Box>
        {selectedRows.length !== 0 ? (
          <Button
            variant="contained"
            color="danger"
            onClick={handleDelete}
            disabled={selectedRows.length === 0}
            style={{ marginTop: "", display: "absolute" }}
          >
            <DeleteOutlineOutlinedIcon />
          </Button>
        ) : null}
      </Box>
    </Paper>
  );
}

export default TableData;
