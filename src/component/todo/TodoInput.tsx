import * as React from 'react';
import {Input, message} from 'antd';
import {EnterOutlined} from '@ant-design/icons/lib';
import {connect} from 'react-redux';
import {addTodo} from '../../redux/action/TodoAction';
import axios from '../../http/axios';

interface ITodoInputState {
  description: string
}

interface TodoInputProps {
  addTodo: (payload: any) => any
}

class TodoInput extends React.Component<TodoInputProps, ITodoInputState> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.postTodo = this.postTodo.bind(this);
  }

  handleChange(event: any) {
    this.setState({
      description: event.target.value
    });
  }

  onKeyUp(event: any) {
    if (event.keyCode === 13 && this.state.description !== '') {
      this.postTodo();
    } else if (event.keyCode === 13 && this.state.description === '') {
      message.info('输入内容不能为空', 3);
    }
  }

  postTodo = async () => {
    try {
      const response = await axios.post('todos', {description: this.state.description})
      this.props.addTodo(response.data.resource)
    }catch (e) {
      throw new Error(e)
    }
    this.setState({description: ''});
  };

  public render() {
    const {description} = this.state;
    const suffix = description ? <EnterOutlined onClick={this.postTodo}/> : <span/>;
    return (
      <Input
        placeholder="添加新任务"
        suffix={suffix}
        value={description}
        onChange={event => this.handleChange(event)}
        onKeyUp={event => this.onKeyUp(event)}
      />
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
});

const mapDispatchToProps = {
  addTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);
