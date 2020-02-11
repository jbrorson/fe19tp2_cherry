import React, {Component} from './node_modules/react';
import { Line, Doughnut  } from './node_modules/react-chartjs-2';

const doughnutData = {
  labels: ['Swedbank salary', 'Nordea salary', 'Whatvetjag salary'],
  datasets: [
    {
      label: 'Salary Doughnut',
      backgroundColor: [
          'rgba(110, 114, 20, 1)',
          'rgba(57, 63, 172, 1)',
          'rgba(0, 148, 97, 1)'
      ],
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      fill: false,
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      data: [11000, 5000, 8888]
    }
  ]
};

const lineData = {
  labels: ['Swedbank salary', 'Nordea salary', 'Whatvetjag salary'],
  datasets: [
    {
      label: 'first dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [22, 33, 4]
    },
    {
      label: 'Second dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [55, 77, 99]
    }
  ]
};


export default class Graph extends Component {
  render() {
    return (
      <div>
        <h2>Line Example</h2>
        <Doughnut  ref="chart" data={doughnutData} />
      </div>
    );
  }

  componentDidMount() {
    const { datasets } = this.refs.chart.chartInstance.data
    console.log(datasets[0].data);
  }
}
