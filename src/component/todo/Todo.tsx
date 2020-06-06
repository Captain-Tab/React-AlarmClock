import * as React from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import '../../style/Todo.scss';
import {connect} from 'react-redux';


class Todo extends React.Component<any, any> {

  get UnDeletedTodo() {
    return this.props.todoItem.filter((t: any) => !t.deleted);
  }

  get unCompletedTodo() {
    return this.UnDeletedTodo.filter((t: any) => !t.completed);
  }

  get CompletedTodo() {
    return this.UnDeletedTodo.filter((t: any) => t.completed);
  }


  public render() {
    return (
      <div className="Todo" id="Todo">
        <TodoInput/>
        <div className="TodoList">
          {
            this.unCompletedTodo.map((t: any) => {
                return (
                  <TodoItem key={t.id} {...t}
                  />
                );
              }
            )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todoItem: state.TodoReducer,
  ...ownProps
});



export default connect(mapStateToProps)(Todo);