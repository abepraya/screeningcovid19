import { ChatRounded } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';


const Chart = ({labels, titles1, titles2, titles3, datas1, datas2, datas3}) => {
  const [chartData, setChartData] = useState({});

    const ChartGraph = () => {
        try{
            setChartData({
                labels: labels,
                datasets: [{
                    axis: 'y',
                    label: titles1,
                    data: datas1,
                    backgroundColor: "yellow",
                    borderColor: "orange",
                    borderWidth: 1
                    },
                    {
                    axis: 'y',
                    label: titles2,
                    data: datas2,
                    backgroundColor: "green",
                    borderColor: "yellowgreen",
                    borderWidth: 1
                    },
                    {
                    axis: 'y',
                    label: titles3,
                    data: datas3,
                    backgroundColor: "red",
                    borderColor: "orange",
                    borderWidth: 1
                    }
    
            ]
            })
        }catch(err){
            alert(err.message);
        }
    }

    useEffect(() => {
        ChartGraph();
    },[]);

  return (
    <div>
        {chartData && <Bar data={chartData} options={{responsive:true, maintainAspectRation: false, indexAxis: 'y' , title: {text: "Global Case", display: true}, scales:{yAxes:[{ticks:{beginAtZero: true}}]}}} />}
    </div>
  );
};

export default Chart;
