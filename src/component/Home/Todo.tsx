import * as React from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import axios from '../../http/axios';
import {connect} from 'react-redux';
import {addTodo} from '../../redux/action/action';
import '../../style/Todo.scss';

interface ITodoState {
  todoItem: any[]
}

class Todo extends React.Component<any, ITodoState> {
  constructor(props: any) {
    super(props);
    this.state = {
      todoItem: [],
    };
    this.updateTodo = this.updateTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.getTodos = this.getTodos.bind(this);

  }


  addTodo = async (params: any) => {
    const {todoItem} = this.state;
    try {
      const response = await axios.post('todos', params);
      this.setState({todoItem: [response.data.resource, ...todoItem]});
    } catch (e) {
      throw new Error();
    }
  };

  componentDidMount() {
    this.getTodos();
  }

  getTodos = async () => {
    try {
      const response = await axios.get('todos');
      const todoItem = response.data.resources.map((t: any) => Object.assign({}, t, {editing: false}));
      this.setState({todoItem});
    } catch (e) {
      throw new Error(e);
    }
  };

  updateTodo = async (id: number, params: any) => {
    const {todoItem} = this.state;
    try {
      const response = await axios.put(`todos/${id}`, params);
      const newtodoItem = todoItem.map((t) => {
        if (id === t.id) {
          return response.data.resource;
        } else {
          return t;
        }
      });
      this.setState({todoItem: newtodoItem});
    } catch (e) {
      throw new Error(e);
    }
  };

  toEdit = (id: number) => {
    const {todoItem} = this.state;
    const newtodoItem = todoItem.map(t => {
        if (id === t.id) {
          return Object.assign({}, t, {editing: true});
        } else {
          return Object.assign({}, t, {editing: false});
        }
      }
    );
    this.setState({todoItem: newtodoItem});
  };


  get UnDeletedTodo() {
    return this.state.todoItem.filter(t => !t.deleted);
  }

  get unCompletedTodo() {
    return this.UnDeletedTodo.filter(t => !t.completed);
  }

  get CompletedTodo() {
    return this.UnDeletedTodo.filter(t => t.completed);
  }


  public render() {
    return (
      <div className="Todo" id="Todo">
        <TodoInput/>
        <div className="TodoList">
          {
            this.unCompletedTodo.map(t => {
                return (
                  <TodoItem key={t.id} {...t}
                            update={this.updateTodo}
                            toEdit={this.toEdit}
                  />
                );
              }
            )
          }
          {
            this.CompletedTodo.map(t => {
                return (
                  <TodoItem key={t.id} {...t}
                            update={this.updateTodo}
                            toEdit={this.toEdit}
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

const mapStateToProps =(state:any,ownProps:any)=>({
  todoItem: state.todo,
  ...ownProps
})

const mapDispatchToProps ={
  addTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(Todo);