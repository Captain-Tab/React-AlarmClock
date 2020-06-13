import * as React from 'react';
import {Tabs} from 'antd';
import {LineChartOutlined} from '@ant-design/icons/lib';
import _ from 'lodash';
import {format} from 'date-fns';
import '../../style/TotalCount.scss';
import TotalChart from '../echarts/TotalChart';

interface IdataProps {
  finishedTodo: any[]
  finishedTomato: any[]
  unfinishedTodo: any[]
}

class TotalCount extends React.Component<IdataProps, any> {

  get dailyFinishedTodo() {
    return _.groupBy(this.props.finishedTodo, (todo) => {
      return format(new Date(todo.updated_at), 'yyyy-MM-d');
    });
  }

  get dailyFinishedTomato() {
    return _.groupBy(this.props.finishedTomato, (todo) => {
      return format(new Date(todo.updated_at), 'yyyy-MM-d');
    });
  }

  // 获取一天完成的最多任务数量
  computeMax(value: any) {
    let todoMax = 0;
    for (let i in value) {
      let eachValue = value[i].length;
      if (eachValue > todoMax) {
        todoMax = eachValue;
      }
    }
    return todoMax;
  }

  // 确认今天是否有完成任务，成功则返回任务数量
  isTodayExist() {
    let value;
    const day = format(new Date(), 'yyyy-MM-d');
    const result = this.dailyFinishedTomato.hasOwnProperty(day);
    if (result) {
      value = this.dailyFinishedTomato[day];
      return value.length;
    } else {
      return 0;
    }
  }

  ComputeAxisName(data: any) {
    return Object.keys(data).sort((a, b) =>
      Date.parse(a) - Date.parse(b)
    );
  }

  ComputeSeriesData(data: any) {
    let seriesData: any[] = [];
    const axisName = this.ComputeAxisName(data);

    axisName.map((date: string) => {
      seriesData.push(data[date].length);
      return '';
    });
    return seriesData;
  }

  public render() {
    const {TabPane} = Tabs;
    const finishedTodoCount = this.props.finishedTodo.length;
    const finishedTomatoCount = this.props.finishedTomato.length;
    const todoMax = this.computeMax(this.dailyFinishedTodo);
    const tomatoMax = this.computeMax(this.dailyFinishedTomato);

    return (
      <div className="TotalCount" id="TotalCount">
        <Tabs defaultActiveKey="2" type="card">
          <TabPane tab={<span><LineChartOutlined/>番茄统计</span>} key="1" >
            <div className="informationBar">
              <div className="showItem">
                <span className="itemText">累计完成</span>
                <span className="itemNumber">{finishedTomatoCount}</span>
              </div>
              <div className="showItem">
                <span className="itemText">单日完成最多</span>
                <span className="itemNumber">{tomatoMax}</span>
              </div>
              <div className="showItem">
                <span className="itemText">今日完成</span>
                <span className="itemNumber">{this.isTodayExist()}</span>
              </div>
            </div>

              <div className="chartBox">
                <TotalChart chartType="tomatoChart"
                            axisData={this.ComputeAxisName(this.dailyFinishedTomato)}
                            seriesData={this.ComputeSeriesData(this.dailyFinishedTomato)}

                />
            </div>

          </TabPane>
          <TabPane tab={<span><LineChartOutlined/>任务统计</span>} key="2">
            <div className="informationBar">

              <div className="showItem">
                <span className="itemText">累计完成</span>
                <span className="itemNumber">{finishedTodoCount}</span>
              </div>
              <div className="showItem">
                <span className="itemText">单日完成最多</span>
                <span className="itemNumber">{todoMax}</span>
              </div>
              <div className="showItem">
                <span className="itemText">剩余任务</span>
                <span className="itemNumber">{this.props.unfinishedTodo.length}</span>
              </div>

            </div>

              <div className="chartBox">
                <TotalChart chartType="todoChart"
                            axisData={this.ComputeAxisName(this.dailyFinishedTodo)}
                            seriesData={this.ComputeSeriesData(this.dailyFinishedTodo)}

                />
              </div>


          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default TotalCount;
