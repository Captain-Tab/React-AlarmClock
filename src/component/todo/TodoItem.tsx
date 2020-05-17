import * as React from 'react';
import {Checkbox, message} from 'antd';
import {EnterOutlined, DeleteFilled} from '@ant-design/icons/lib';
import classNames from 'classnames';
import '../../style/TodoItem.scss';
import {connect} from 'react-redux';
import {updateTodo, editTodo} from '../../redux/action/TodoAction';
import axios from '../../http/axios';

interface ITodoItemProps {
  id: number
  description: string;
  completed: boolean;
  editing: boolean;
  updateTodo: (payload: any) => any
  editTodo: (id: number) => any
}

interface ITodoItemState {
  editText: string
}

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
  constructor(props: ITodoItemProps) {
    super(props);
    this.state = {
      editText: this.props.description
    };
    this.updateTodo = this.updateTodo.bind(this);
    this.switchEditing = this.switchEditing.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  updateTodo = async (params: any) => {
    try {
      const response = await axios.put(`todos/${this.props.id}`, params);
      this.props.updateTodo(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };

  switchEditing = () => {
    this.props.editTodo(this.props.id);
  };

  handleKeyUp = (event: any) => {
    if (event.keyCode === 13 && this.state.editText !== '') {
      this.props.updateTodo({description: this.state.editText});
    } else if (event.keyCode === 13 && this.state.editText === '') {
      message.info('输入内容不能为空', 3);
    }
  };

  public render() {
    const Editing = (
      <div className="editing">
        <input type="text"
               value={this.state.editText}
               onChange={(event) => this.setState({editText: event.target.value})}
               onKeyUp={event => this.handleKeyUp(event)}
        />
        <div className="iconWrapper">
          <EnterOutlined onClick={(event) => this.updateTodo({description: this.state.editText})}/>

          <DeleteFilled
            onClick={(event) => this.updateTodo({deleted: true})}/>
        </div>
      </div>);

    const Text = <span className="text" onDoubleClick={this.switchEditing}> {this.props.description}</span>;

    const todoItemClass = classNames({
      TodoItem: true,
      editing: this.props.editing,
      completed: this.props.completed
    });

    return (
      <div className={todoItemClass} id="TodoItem">
        <Checkbox checked={this.props.completed}
                  onChange={event => {this.updateTodo({completed: event.target.checked});}}
        >
        </Checkbox>
        {
          this.props.editing ?
            Editing : Text
        }
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
});

const mapDispatchToProps = {
  updateTodo,
  editTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
