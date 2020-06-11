import * as React from 'react';
import echarts from 'echarts';
import {useEffect, useRef, useState} from 'react';
import _ from 'lodash'
import {format} from 'date-fns'

interface IData {
  data:any,
  itemType: string
}

const StackAreaChart = (props: IData) => {
    let data
    let finishedData
    let seriesData: any[] = []

    if( props.itemType === 'todoData'){
      data = props.data;
      finishedData = data.filter((t: any) => t.completed && !t.deleted);
    }else if(props.itemType === 'tomatoData'){
      data = props.data
      finishedData = data.filter((t:any) => t.ended_at && !t.aborted && !t.manually_created)
    }

    const dailyFinishedData = _.groupBy(finishedData, (todo) => {
        return format(new Date(todo.updated_at), 'yyyy-MM-d')
      });

    const axisData = Object.keys(dailyFinishedData).sort((a, b) => Date.parse(a) - Date.parse(b));

    axisData.map((date:string)=>{
      seriesData.push(dailyFinishedData[date].length)
      return ''
    })

    // console.log(seriesData)
    // eslint-disable-next-line
    const chartData = {
      tooltip: {
        show: true,
        formatter:function (params: any) {
          let res = params.name + `: 完成了${params.value}个`
          return res
        },
        textStyle : {
          fontSize: 12,
        },
      },
      grid: {
        x: 5,
        y: 5,
        x2: 2,
        y2: 0
      },
      xAxis: {
        show: false,
        type: 'category',
        boundaryGap: false,
        data: axisData.slice(-4)
      },
      yAxis: {
        show: false,
        type: 'value'
      },
      series: [{
        showSymbol: true,
        symbolSize: 3,   //设定实心点的大小
        data: seriesData.slice(-4),
        type:"line",
        areaStyle: {}
      }]
    }
    // @typescript-eslint/no-unused-vars
    const [option, setOption] = useState(chartData);
    const container = useRef<any>(null);
    const chart = useRef<any>(null);
    useEffect(() => {
      const width = document.getElementsByClassName('charts-container chart3')[0].clientWidth * 3.4;
      const height = document.getElementsByClassName('charts-container chart3')[0].clientHeight;
      container.current.style.width = `${width}px`;
      container.current.style.height = `${height}px`;
      chart.current = echarts.init(container.current, 'light');
      chart.current.setOption(option);
      // eslint-disable-next-line
    }, [option]);
    useEffect(() => {
      chart.current.setOption(chartData);
    }, [chartData]);
    return (
      <div ref={container}>你好</div>
    );
  };
export default StackAreaChart