import "./App.css";
import { useEffect, useState } from "react";
import { getData } from "./operations/idb";
import InsertContainer from "./components/InsertContainer";
import TableData from "./components/tableData";
import { Button } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChartView from "./components/chartView";
import Grid from "@mui/material/Grid2";
import UserPrefChart from "./components/userChartPref";

function App() {
  const [data, setData] = useState([]);
  const [adding, setAdding] = useState(false);

  // Fetch data from IndexedDB when the component mounts
  useEffect(() => {
    const initializeData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error("Error initializing data", error);
      }
    };

    initializeData();
  }, []);

  return (
    <div>
      <h1 className="mainTitle">GrushIO</h1>
      <Grid
        container
        spacing={2}
        sx={{
          padding: 2,
          width: "100%",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            marginBottom: 2,
            marginTop: 2,
            width: "90%",
          }}
          margin={"auto"}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <div>
              {/* Button to toggle the visibility of the InsertContainer */}
              <Button variant="contained" onClick={() => setAdding(!adding)}>
                Add Data{" "}
                {adding ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </Button>
              {/* InsertContainer component to add new data */}
              <div hidden={!adding}>
                <InsertContainer setData={setData} />
              </div>
              {/* TableData component to display the data in a table */}
              <TableData data={data} setData={setData} />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <div className="user-pref">
              {/* UserPrefChart component to display user preferences */}
              <UserPrefChart data={data} />
            </div>
          </Grid>
        </Grid>
        <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
          {/* ChartView component to display the data in a chart */}
          <ChartView data={data} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
