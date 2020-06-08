import * as React from 'react';
import '../../style/Statistics.scss';
import {connect} from 'react-redux';
// import Polygon from './Polygon';
import _ from 'lodash';
import {format} from 'date-fns';
import TotalCount from './TotalCount';
import TomatoHistory from './TomatoHistory';
import TodoHistory from './TodoHistory';
import TodoHistoryEcharts from '../echarts/TodoHistoryChart';


interface IStatisticsProps {
  todoData: any[]
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

  get finishedTodo() {
    return this.props.todoData.filter(t => t.completed);
  }

  get dailyTodo() {
    return _.groupBy(this.finishedTodo, (todo) => {
      return format(new Date(todo.updated_at), 'yyy-MM-d');
    });
  }

  public render() {
    return (
      <div className="Statistics" id="Statistics">
        <ul>
          <li className={`${this.state.activeClass === 1 ? 'switchTab active' : 'switchTab'}`}
              onClick={() => {this.ShowComponent('showHideTotalCount', 1);}}>
            统计

          </li>
          <li className={`${this.state.activeClass === 2 ? 'switchTab active' : 'switchTab'}`}
              onClick={() => {this.ShowComponent('showHidePotatoCount', 2);}}>
            <div className="text-container">
              <span className="title">番茄历史</span>
              <span className="subtitle">累计完成任务</span>
              <span className="quantity"> </span>
            </div>

            <div className="charts-container">
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
              <TodoHistoryEcharts/>
            </div>
          </li>
        </ul>


        {/*<TodoHistory/>*/}
        <div className="InformationContainer">
          {this.renderComponent()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todoData: state.TodoReducer,
  ...ownProps
});

// const mapDispatchToProps = {
// };

export default connect(mapStateToProps)(Statistics);
