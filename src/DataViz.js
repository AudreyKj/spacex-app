import React, { useState, useEffect } from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

function DataViz(props) {
  const [info, setInfo] = useState(false);

  /* eslint-disable */
  useEffect(() => {
    const data = props.props;
    const successes = data.filter(elem => elem.success);

    const failures = data.filter(elem => elem.success === false);

    setInfo({
      labels: ["failures", "successes"],
      datasets: [
        {
          data: [failures.length, successes.length],
          backgroundColor: ["#ff0000", "#228B22"],
          hoverBackgroundColor: ["#ccc", "#ccc"]
        }
      ]
    });
  }, [props.data, props.success, props.failures]);

  return (
    <div className="data-viz">
      <div>
        {info && (
          <Pie
            data={info}
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
