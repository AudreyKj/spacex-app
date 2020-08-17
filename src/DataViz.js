import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";

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
          backgroundColor: ["#ff2700", "#228B22"],
          hoverBackgroundColor: ["#ccc", "#ccc"]
        }
      ]
    });
  }, []);

  return (
    <div className="data-viz">
      {info && (
        <Pie
          data={info}
          width={200}
          height={200}
          options={{ maintainAspectRatio: false }}
        />
      )}
    </div>
  );
}

export default DataViz;
