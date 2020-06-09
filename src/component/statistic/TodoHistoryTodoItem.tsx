import * as React from 'react';
import {format} from 'date-fns';
import {connect} from 'react-redux';
import {updateTodo} from '../../redux/action/TodoAction';
import '../../style/TodoHistoryTodoItem.scss';
import axios from '../../http/axios';

interface ITodoHistoryProp {
  todo: any
  itemType: string
  updateTodo: (payload: any) => void
}

class TodoHistoryTodoItem extends React.Component<ITodoHistoryProp, any> {

  updateTodo = async (params: any) => {
    try {
      let response = await axios.put(`todos/${this.props.todo.id}`, params);
      this.props.updateTodo(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };

  public render() {
    // eslint-disable-next-line
    let time;
    let timeSyntax: string = '';
    let action;
    if (this.props.itemType === 'finished') {
      timeSyntax = 'HH:mm';
      time = this.props.todo.updated_at;
      action = (<div className="action">
        <span onClick={() => this.updateTodo({completed: false})}>恢复</span>
        <span onClick={() => this.updateTodo({deleted: true})}>删除</span>
      </div>);
    } else if (this.props.itemType === 'deleted') {
      timeSyntax = 'yyyy-MM-d HH:MM';
      time = this.props.todo.created_at;
      action = (<div className="action">
        <span onClick={() => this.updateTodo({deleted: false})}>恢复</span>
      </div>);
    }

    return (
      <div className="TodoHistoryTodoItem" id="TodoHistoryTodoItem">
        <div className="text">
          <span className="time">{format(new Date(this.props.todo.updated_at), timeSyntax)} </span>
          <span className="description">{this.props.todo.description}</span>
        </div>
        <div className="action">
          {action}
        </div>

      </div>
    );
  }
}


const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
});

const mapDispatchToProps = {
  updateTodo
};


export default connect(mapStateToProps, mapDispatchToProps)(TodoHistoryTodoItem);

