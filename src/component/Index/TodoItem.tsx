import * as React from 'react';
import {Checkbox, message} from 'antd';
import {CheckCircleFilled, DeleteOutlined} from '@ant-design/icons/lib';
import '../../style/TodoItem.scss';

interface ITodoItemProps {
  id: number
  description: string;
  completed: boolean;
  editing: boolean;
  update: (id: number, params: any) => void
  toEdit: (id: number) => void
}

interface ITodoItemState {
  editText: string
}

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
  constructor(props: ITodoItemProps) {
    super(props);
    this.state={
      editText: this.props.description
    }
    this.update = this.update.bind(this);
    this.switchEditing = this.switchEditing.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  update = (params: any) => {
    this.props.update(this.props.id, params);
  };

  switchEditing = () => {
    this.props.toEdit(this.props.id);
  };

  handleKeyUp=(event: any)=>{
    if(event.keyCode === 13 && this.state.editText !== ''){
      this.update({description: this.state.editText})
    }else if (event.keyCode === 13 && this.state.editText === ''){
      message.info('输入内容不能为空',3)
    }
  }

  public render() {
    const Editing = (
      <div className="Editing">
        <input type="text"
               value={this.state.editText}
               onChange={(event) => this.setState({editText: event.target.value})}
               onKeyUp={event => this.handleKeyUp(event)}
        />
        <div className="iconWrapper">
          <CheckCircleFilled onClick={(event) => this.update({description: this.state.editText})}/>
          <DeleteOutlined
            onClick={(event) => this.update({deleted: true})}/>
        </div>
      </div>);

    const Text = <span onDoubleClick={this.switchEditing}> {this.props.description}</span>
    return (
      <div className="TodoItem" id="TodoItem">
        <Checkbox checked={this.props.completed}
                  onChange={event => {this.update({completed: event.target.checked});}}
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

export default TodoItem;