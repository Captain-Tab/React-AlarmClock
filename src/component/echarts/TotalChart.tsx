import * as React from 'react';
import echarts from 'echarts';
import {useEffect, useRef, useState} from 'react';

interface IData {
  chartType: string
  axisData:any,
  seriesData: any,
}

const TotalChart = (props: IData) => {
  const chartData = {
    tooltip: {
      show: true,
      formatter:function (params: any) {
        return params.name + `: 完成了${params.value}个`
      },
      textStyle : {
        fontSize: 12,
      },
    },
    xAxis: {
      type: 'category',
      data: props.axisData,
      axisLabel: {
        show: true,
        interval:0,
        fontSize: 7,
        fontWeight: "bold",
      },
      axisTick: {
        show: true
      }
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [{
      showSymbol: true,
      symbolSize: 10,
      data: props.seriesData,
      type: 'line'
    }],
    grid: {
      x: 0,
      y: 20,
      x2: 0,
      y2: 20
    },
  };
  // eslint-disable-next-line
  const [option, setOption] = useState(chartData);
  const container = useRef<any>(null);
  const chart = useRef<any>(null);
  useEffect(() => {
    const width = document.getElementsByClassName('chartBox')[0].clientWidth * 0.95;
    const height = document.getElementsByClassName('chartBox')[0].clientHeight * 5;
    container.current.style.width = `${width}px`;
    container.current.style.height = `${height}px`;

    chart.current = echarts.init(container.current, 'light');
    chart.current.setOption(option);

    // 根据网页的大小，更新图表的大小
    window.addEventListener("resize", () => {
      const width = document.getElementsByClassName('chartBox')[0].clientWidth * 0.95;
      chart.current.resize({width})
    });
    // window.onresize = () => {
    //
    // }
    // eslint-disable-next-line
  }, [option]);
  useEffect(() => {
    chart.current.setOption(chartData);
  }, [chartData]);

  return (
    <div ref={container}>你好</div>
  );
};
export default TotalChart;