import * as React from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import axios from '../../http/axios';
import '../../style/Todo.scss';
import {connect} from 'react-redux';
import {initTodo} from '../../redux/action/TodoAction'


class Todo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.getTodos = this.getTodos.bind(this);
  }


  get UnDeletedTodo() {
    return this.props.todoItem.filter((t: any) => !t.deleted);
  }

  get unCompletedTodo() {
    return this.UnDeletedTodo.filter((t: any) => !t.completed);
  }

  get CompletedTodo() {
    return this.UnDeletedTodo.filter((t: any) => t.completed);
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos = async () => {
    try {
      const response = await axios.get('todos');
      const todoItem = response.data.resources.map((t: any) => Object.assign({}, t, {editing: false}));
      this.props.initTodo(todoItem);
    } catch (e) {
      throw new Error(e);
    }
  };

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
          {
            this.CompletedTodo.map((t: any) => {
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

const mapDispatchToProps = {
  initTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);