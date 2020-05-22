import * as React from 'react';
import {connect} from 'react-redux';
import {format} from 'date-fns';
import _ from 'lodash';

interface ITodohistoryProps {
  todoData: any[]
}


const TodoItem = (props: any) => {
  return (
    <div>
      <span>{props.updated_at}</span>
      <span>{props.description}</span>
    </div>
  );
};

class TodoHistory extends React.Component<ITodohistoryProps, any> {

  get finishedTodo() {
    return this.props.todoData.filter(t => t.completed && !t.deleted);
  }

  get deletedTodo() {
    return this.props.todoData.filter(t => t.deleted);
  }

  get dailyFinishedTodo() {
    return _.groupBy(this.finishedTodo, (todo) => {
      return format(new Date(todo.updated_at), 'yyyy-MM-d');
    });
  }

  get date() {
    return Object.keys(this.dailyFinishedTodo).sort((a,b)=>Date.parse(b)-Date.parse(a));
  }


  public render() {
    const TodoList = this.date.map(date => {
      return (
        <div key={date}>

          <div>
            {date}
            完成了{this.dailyFinishedTodo[date].length}个任务
          </div>

          <div>
            {this.dailyFinishedTodo[date].map(todo => <TodoItem key={todo.id} {...todo}/>)}
          </div>

        </div>

      );
    });


    return (
      <div className="TodoHistory" id="TodoHistory">
        {
          TodoList
        }
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todoData: state.TodoReducer,
  ...ownProps
});

export default connect(mapStateToProps)(TodoHistory);
