import * as React from 'react';
import echarts from 'echarts';
import {useEffect, useRef, useState} from 'react';
import {connect,} from 'react-redux';
import _ from 'lodash';
import {format} from 'date-fns';


const TodoHistoryChart = (props: any) => {


  const todoData = props.todoData;

  const finishedTodo = todoData.filter((t: any) => t.completed && !t.deleted);

  const dailyFinishedTodo = _.groupBy(finishedTodo, (todo) => {
      return format(new Date(todo.updated_at), 'yyyy-MM-d')
    });

    const axisData = Object.keys(dailyFinishedTodo).sort((a, b) => Date.parse(a) - Date.parse(b));
    let seriesData: any[] = []
    const objectValue = Object.values(dailyFinishedTodo)
    objectValue.map((t:any)=>{
      seriesData.push(t.length)
    })

  console.log(seriesData)
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
      x: 1,
      y: 10,
      x2: 1,
      y2: 0
    },
    xAxis: {
      show: false,
      type: 'category',
      boundaryGap: false,
      data: axisData
    },
    yAxis: {
      show: false,
      type: 'value'
    },
    series: [{
      showSymbol: true,
      symbolSize: 3,   //设定实心点的大小
      data: seriesData,
      type:"line",
      areaStyle: {}
    }]
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

const mapStateToProps = (state: any, ownProps: any) => ({
  todoData: state.TodoReducer,
  ...ownProps
});

export default connect(mapStateToProps)(TodoHistoryChart);