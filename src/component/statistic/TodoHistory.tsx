import * as React from 'react';
import {connect} from 'react-redux';
import {format} from 'date-fns';
import _ from 'lodash';
import {Badge, Tabs} from 'antd';
import {FileDoneOutlined, FileExcelOutlined} from '@ant-design/icons/lib';
import '../../style/TodoHistory.scss';
import TodoHistoryTodoItem from './TodoHistoryTodoItem';
import {Pagination} from 'antd';

interface ITodohistoryProps {
  todoData: any[]
}

class TodoHistory extends React.Component<ITodohistoryProps, any> {
  constructor(props: ITodohistoryProps) {
    super(props);
    this.state = {
      minValue: 0,
      maxValue: 3
    };
  }

  handleChange = (value: any) => {
    if (value <= 1) {
      this.setState({
        minValue: 0,
        maxValue: 3
      });
    } else {
      this.setState({
        minValue: (value - 1) * 3,
        maxValue: (value - 1) * 3 + 3
      });
    }
  };

  get finishedTodo() {
    return this.props.todoData.filter(t => t.completed && !t.deleted);
  }

  // 运用了date_fns的format方法和loadash的_.groupBy方法，将数据为同一天的进行分组
  get dailyFinishedTodo() {
    return _.groupBy(this.finishedTodo, (todo) => {
      return format(new Date(todo.updated_at), 'yyyy-MM-d');
    });
  }

  get finishedDate() {
    return Object.keys(this.dailyFinishedTodo).sort((a, b) => Date.parse(b) - Date.parse(a));
  }

  get deletedTodo() {
    return this.props.todoData.filter(t => t.deleted);
  }


  public render() {
    const min = this.state.minValue;
    const max = this.state.maxValue;
    console.log(min);
    const {TabPane} = Tabs;
    console.log(this.finishedDate);
    const finishedTodoList = this.finishedDate.slice(min, max).map(date => {
      return (
        <div key={date} className="dailyTodo">
          <div className="summary">
            <div className="dateWrapper">
              <span className="date">{date}</span>
              <span className="weekday"> </span>
            </div>
            <span className="finishCount">完成了 <Badge style={{backgroundColor: '#1890ff'}}
                                                     count={this.dailyFinishedTodo[date].length}/> 个任务</span>
          </div>
          <div className="todoList">
            {this.dailyFinishedTodo[date].map(todo => <TodoHistoryTodoItem key={todo.id} todo={todo}
                                                                           itemType="finished"/>)}
          </div>
        </div>

      );
    });

    const deletedTodoList = this.deletedTodo.slice(min, max).map(todo => {
      return (
        <TodoHistoryTodoItem key={todo.id} todo={todo} itemType="deleted"/>
      );
    });

    return (
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab={<span><FileDoneOutlined/>已完成任务</span>} key="1">
          <div className="TodoHistory" id="TodoHistory">
            {finishedTodoList}
          </div>
          <Pagination
            defaultCurrent={1}
            defaultPageSize={3}
            onChange={this.handleChange}
            total={this.finishedDate.length}
          />
        </TabPane>
        <TabPane tab={<span><FileExcelOutlined/>已删除任务</span>} key="2">
          <div className="TodoHistory" id="TodoHistory">
            {deletedTodoList}
          </div>
          <Pagination
            defaultCurrent={1}
            defaultPageSize={3}
            onChange={this.handleChange}
            total={this.deletedTodo.length}
          />
        </TabPane>
      </Tabs>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todoData: state.TodoReducer,
  ...ownProps
});

export default connect(mapStateToProps)(TodoHistory);
