import * as React from 'react';
import {Checkbox} from 'antd';

interface ITodoItemProps {
  id: number
  description: string;
  completed: boolean;
  update: (id: number, params: any) => void
}

class TodoItem extends React.Component<ITodoItemProps, any> {
  constructor(props: ITodoItemProps) {
    super(props);
    this.update = this.update.bind(this);
  }

  update = (params: any) => {
    this.props.update(this.props.id, params);
  };


  public render() {
    return (
      <div className="TodoItem" id="TodoItem">
        <Checkbox checked={this.props.completed}
                  onChange={event => {this.update({completed: event.target.checked});}}
        >

        </Checkbox>
        <span> {this.props.description}</span>
      </div>
    );
  }
}

export default TodoItem;