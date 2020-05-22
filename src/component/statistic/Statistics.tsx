import * as React from 'react';
import '../../style/Statistics.scss'
import {connect} from 'react-redux';
import Polygon from './Polygon';
import _ from 'lodash';
import {format} from 'date-fns'
import TodoHistory from './TodoHistory';

interface IStatisticsProps {
  todoData: any[]
}

class Statistics extends React.Component<IStatisticsProps, any> {

  get finishedTodo(){
    return this.props.todoData.filter(t=>t.completed)
  }

  get dailyTodo(){
    return _.groupBy(this.finishedTodo,(todo)=>{
      return format(new Date(todo.updated_at),'yyy-MM-d')
    })
  }

  public render() {
    return (
      <div className="Statistics" id="Statistics">
        <ul>
          <li>统计</li>
          <li>目标</li>
          <li>番茄历史</li>
          <li>
            任务历史
            累计完成{this.finishedTodo.length}个任务
            <Polygon data={this.dailyTodo} totalFinishedCount={this.finishedTodo.length}/>
          </li>
        </ul>
        <div>
          <TodoHistory/>
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
