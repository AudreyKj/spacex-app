import React, { useState, useEffect } from "react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

function DataViz(props) {
  const info = useSelector(state => state.users);
  const success = useSelector(state => state.success);
  const failures = useSelector(state => state.fail);
  const futureLaunches = useSelector(state => state.future);
  const noFutureLaunches = useSelector(state => state.nofuture);
  const before2010 = useSelector(state => state.before2010);
  const after2010 = useSelector(state => state.after2010);
  const [successFail, setSuccess] = useState();
  const [future, setFuture] = useState();
  const [date, setDate] = useState();

  /* eslint-disable */
  useEffect(() => {
    if (after2010) {
      setSuccess({
        labels: ["failures", "successes"],
        datasets: [
          {
            data: [failures.length, success.length],
            backgroundColor: ["#e67f83", "#6aaa96"],
            hoverBackgroundColor: ["#ccc", "#ccc"]
          }
        ]
      });

      setFuture({
        labels: ["no future launches", "future launches"],
        datasets: [
          {
            data: [noFutureLaunches.length, futureLaunches.length],
            backgroundColor: ["#36A2EB", "#FFCE56"],
            hoverBackgroundColor: "#ccc",
            hoverBorderColor: "#ccc"
          }
        ]
      });

      setDate({
        labels: ["before 2010", "after 2010", "total"],
        datasets: [
          {
            label: "launches year date",
            backgroundColor: "rgb(185, 106, 75, 0.7)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgb(185, 106, 75, 0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [before2010.length, after2010.length, info.length]
          }
        ]
      });
    }
  }, [after2010]);

  return (
    <div className="data-viz-container">
      <div className="single-chart padding-right">
        {success && (
          <Pie
            data={successFail}
            width={300}
            height={300}
            options={{ maintainAspectRatio: false }}
          />
        )}
      </div>
      <div className="single-chart">
        {date && (
          <Bar
            data={date}
            width={300}
            height={300}
            options={{ maintainAspectRatio: false }}
          />
        )}
      </div>
      <div className="single-chart padding-left">
        {future && (
          <Doughnut
            data={future}
            width={300}
            height={300}
            options={{ maintainAspectRatio: false }}
          />
        )}
      </div>
    </div>
  );
}

export default DataViz;
