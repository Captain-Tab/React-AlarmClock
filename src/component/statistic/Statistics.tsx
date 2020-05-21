import * as React from 'react';
import '../../style/Statistics.scss'
import {connect} from 'react-redux';

interface IStatisticsProps {
  todoData: any[]
}

class Statistics extends React.Component<IStatisticsProps, any> {

  get finishedTodo(){

    return this.props.todoData.filter(t=>t.completed)
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
            累计完成<div>{this.finishedTodo.length}</div>个任务
          </li>
        </ul>
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
