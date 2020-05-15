import * as React from 'react';
import {Checkbox} from 'antd';
import '../../style/TodoItem.scss';

interface ITodoItemProps {
  id: number
  description: string;
  completed: boolean;
  editing: boolean;
  update: (id: number, params: any) => void
  toEdit: (id: number) => void
}

class TodoItem extends React.Component<ITodoItemProps, any> {
  constructor(props: ITodoItemProps) {
    super(props);
    this.update = this.update.bind(this);
    this.switchEditting = this.switchEditting.bind(this)
  }

  update = (params: any) => {
    this.props.update(this.props.id, params);
  };

  switchEditting = () => {
   this.props.toEdit(this.props.id)
  };

  public render() {

    return (
      <div className="TodoItem" id="TodoItem">
        <Checkbox checked={this.props.completed}
                  onChange={event => {this.update({completed: event.target.checked});}}
        >

        </Checkbox>
        {
          this.props.editing ?
            <input type="text" value={this.props.description}/> :
            <span onDoubleClick={this.switchEditting }> {this.props.description}</span>
        }

      </div>
    );
  }
}

export default TodoItem;