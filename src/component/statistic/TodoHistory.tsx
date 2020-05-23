import * as React from 'react';
import {connect} from 'react-redux';
import {format} from 'date-fns';
import _ from 'lodash';
import {Badge, Tabs} from 'antd';
import {CheckOutlined, CloseOutlined} from '@ant-design/icons/lib';
import '../../style/TodoHistory.scss';
import TodoHistoryTodoItem from './TodoHistoryTodoItem';

interface ITodohistoryProps {
  todoData: any[]
}

class TodoHistory extends React.Component<ITodohistoryProps, any> {

  get finishedTodo() {
    return this.props.todoData.filter(t => t.completed && !t.deleted);
  }

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
    const {TabPane} = Tabs;
    const finishedTodoList = this.finishedDate.map(date => {
      return (
        <div key={date} className="dailyTodo">
          <div className="summary">
            <div className="dateWrapper">
              <span className="date">{date}</span>
              <span className="weekday"> 周五</span>
            </div>
            <p className="finishCount">完成了 <Badge style={{backgroundColor: '#1890ff'}}
                                                  count={this.dailyFinishedTodo[date].length}/> 个任务</p>
          </div>
          <div className="todoList">
            {this.dailyFinishedTodo[date].map(todo => <TodoHistoryTodoItem key={todo.id} todo={todo} itemType="finished"/> )}
          </div>
        </div>

      );
    });

    const deletedTodoList = this.deletedTodo.map(todo => {
      return (
        <TodoHistoryTodoItem key={todo.id} todo={todo}  itemType="deleted"/>
      );
    });

    return (
      <Tabs defaultActiveKey="2">
        <TabPane tab={<span><CheckOutlined/>已完成任务</span>} key="1">
          <div className="TodoHistory" id="TodoHistory">
            {finishedTodoList}
          </div>
        </TabPane>
        <TabPane tab={<span><CloseOutlined/>已删除任务</span>} key="2">
          <div className="TodoHistory" id="TodoHistory">
            {deletedTodoList}
          </div>
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
