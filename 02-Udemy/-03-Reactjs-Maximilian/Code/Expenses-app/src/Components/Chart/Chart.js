import "./Chart.css";
import ChartBar from "./ChartBar";

function Chart(props) {
  const ExpensesValues = props.dataPoints.map((dataPoint) => dataPoint.value);
  const totalMax = Math.max(...ExpensesValues);

  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMax}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
}

export default Chart;
