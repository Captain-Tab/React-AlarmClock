import * as React from 'react';
import TodoInput from './TodoInput';
import axios from '../../http/axios';
import '../../style/Todo.scss'

class Todo extends React.Component<any, any> {
  addTodo = async (params: any) => {
    try {
      const response = await axios.post('todos', params);
      console.log(response.data);
    } catch (e) {
      throw new Error();
    }
  };

  public render() {
    return (
      <div className="Todo" id="Todo">
        <TodoInput addTodo={(params) => this.addTodo(params)}/>
      </div>
    );
  }
}

export default Todo;