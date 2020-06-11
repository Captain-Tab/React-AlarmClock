import * as React from 'react';
import '../../style/Statistics.scss';
import {connect} from 'react-redux';
// import Polygon from './Polygon';
import TotalCount from './TotalCount';
import TomatoHistory from './TomatoHistory';
import TodoHistory from './TodoHistory';
import TabChart from '../echarts/TabChart';

interface IStatisticsProps {
  todoData: any[],
  tomatoData: any[]
}

class Statistics extends React.Component<IStatisticsProps, any> {
  constructor(props: IStatisticsProps) {
    super(props);
    this.state = {
      render: '',
      activeClass: 1,
    };
    this.ShowComponent = this.ShowComponent.bind(this);
    this.renderComponent = this.renderComponent.bind(this);
  }

  get finishedTodo() {
    return this.props.todoData.filter(t => t.completed && !t.deleted);
  }

  get unfinishedTodo(){
    return this.props.todoData.filter(t=> !t.completed && !t.deleted)
  }

  get finishedTomato() {
    return this.props.tomatoData.filter(t => t.ended_at && !t.aborted && !t.manually_created)
  }

  ShowComponent(name: string, index: number) {
    this.setState({render: name, activeClass: index});
  }

  renderComponent = () => {
    switch (this.state.render) {
      case 'showHideTotalCount':
        return <TotalCount/>;
      case 'showHidePotatoCount':
        return <TomatoHistory/>;
      case 'showHideMission':
        return <TodoHistory/>;
      default:
        return <TotalCount/>;
    }
  };

  public render() {
    console.log(this.props.todoData)
    console.log(this.unfinishedTodo)
    return (
      <div className="Statistics" id="Statistics">
        <ul>
          <li className={`${this.state.activeClass === 1 ? 'switchTab active' : 'switchTab'}`}
              onClick={() => {this.ShowComponent('showHideTotalCount', 1);}}>
            <div className="text-container">
              <span className="title">统计</span>
              <span className="subtitle">总共剩余任务</span>
              <span className="quantity">{this.unfinishedTodo.length}</span>
            </div>

            <div className="charts-container">
              <TabChart data={this.finishedTodo} unfinishedData={this.unfinishedTodo} chartType="pieChart"/>
            </div>

          </li>
          <li className={`${this.state.activeClass === 2 ? 'switchTab active' : 'switchTab'}`}
              onClick={() => {this.ShowComponent('showHidePotatoCount', 2);}}>
            <div className="text-container">
              <span className="title">番茄历史</span>
              <span className="subtitle">累计完成任务</span>
              <span className="quantity">{this.finishedTomato.length}</span>
            </div>

            <div className="charts-container">
              <TabChart data={this.finishedTomato} chartType="stackAreaChart"/>
            </div>
          </li>
          <li className={`${this.state.activeClass === 3 ? 'switchTab active' : 'switchTab'}`}
              onClick={() => {this.ShowComponent('showHideMission', 3);}}>
            <div className="text-container">
              <span className="title">任务历史</span>
              <span className="subtitle">累计完成任务</span>
              <span className="quantity">{this.finishedTodo.length}</span>
            </div>
            {/*<Polygon data={this.dailyTodo} totalFinishedCount={this.finishedTodo.length}/>*/}
            <div className="charts-container chart3">
             <TabChart data={this.finishedTodo} chartType="stackAreaChart"/>
            </div>
          </li>
        </ul>

        <div className="InformationContainer">
          {this.renderComponent()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todoData: state.TodoReducer,
  tomatoData: state.TomatoReducer,
  ...ownProps
});

export default connect(mapStateToProps)(Statistics);
