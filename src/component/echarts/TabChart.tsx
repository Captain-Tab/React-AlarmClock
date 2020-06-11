import * as React from 'react';
import echarts from 'echarts';
import {useEffect, useRef, useState} from 'react';
import _ from 'lodash'
import {format} from 'date-fns'

interface IData {
  data:any,
  unfinishedData?: any
  chartType: string
}

const TabChart = (props: IData) => {
  const data = props.data
  let chartData : any
  let seriesData: any[] = []
  let axisData: any[] = []

  if(props.chartType === 'stackAreaChart'){
    const dailyFinishedData = _.groupBy(data, (todo) => {
      return format(new Date(todo.updated_at), 'yyyy-MM-d')
    });

    axisData = Object.keys(dailyFinishedData).sort((a, b) => Date.parse(a) - Date.parse(b));

    axisData.map((date:string)=>{
      seriesData.push(dailyFinishedData[date].length)
      return ''
    })

    chartData = {
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
        symbolSize: 5,   //设定实心点的大小
        data: seriesData.slice(-4),
        type:"line",
        areaStyle: {}
      }]
    }
  }else if(props.chartType === 'pieChart' && props.unfinishedData){
    const finished = data.length
    const unfinished = props.unfinishedData.length


    chartData ={
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}个 ({d}%)'
      },
      series: [
        {
          name: '统计',
          type: 'pie',
          radius: '70%',
          center: ['50%', '50%'],
          data: [
            {value: finished, name: '完成任务'},
            {value: unfinished, name: '未完成任务'}
          ],
          labelLine: {
            show: false
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0,0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }

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
export default TabChart