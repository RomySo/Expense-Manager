import "./components.css";
import { useState } from "react";
import { addData, getData } from "../operations/idb";
import {
  Button,
  CardContent,
  Card,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

import { categoryList } from "../constants";

function InsertContainer({ setData }) {
  // State variables to hold user input
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [date, setDate] = useState("");

  // Function to handle adding data
  const handleAddData = async () => {
    try {
      // Add data to the database
      const id = await addData({
        id: Date.now(),
        cost,
        description,
        category,
        date,
      });
      console.log("Data added with id:", id);

      // Refresh the data after adding
      const updatedData = await getData();
      setData(updatedData);

      // Reset the form fields
      setCategory("");
      setDescription("");
      setCost("");
      setDate("");
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    <Card
      sx={{ maxWidth: 275, zIndex: 50, position: "absolute", boxShadow: 3 }}
    >
      <CardContent sx={{ padding: 2, gap: 2 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddData();
          }}
          className="form-inputs"
        >
          <div className={"input-group"}>
            <TextField
              required={true}
              type="number"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              variant="outlined"
              label="Cost"
            />
            <TextField
              type="text"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
            />
            <TextField
              required={true}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              variant="outlined"
            />
            <FormControl fullWidth required={true}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoryList.map((category, index) => (
                  <MenuItem key={index} value={index}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default InsertContainer;
