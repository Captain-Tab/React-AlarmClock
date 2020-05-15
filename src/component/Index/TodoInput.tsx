import * as React from 'react';
import {Input, message} from 'antd';
import {EnterOutlined} from '@ant-design/icons/lib';

interface ITodoInputState{
  description: string
}

interface TodoInputProps {
  addTodo:(params: any) => void
}

class TodoInput extends React.Component<TodoInputProps, ITodoInputState>{
  constructor(props: any) {
    super(props);
    this.state = {
      description:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.addTodo = this.addTodo.bind(this)
  }

  handleChange(event: any){
    this.setState({
      description: event.target.value
    })
  }

  onKeyUp(event: any){
    if(event.keyCode === 13 && this.state.description !== ''){
      this.addTodo()
    }else if (event.keyCode === 13 && this.state.description === ''){
      message.info('输入内容不能为空',3)
    }
  }

  addTodo(){
      this.props.addTodo({description: this.state.description})
    this.setState({description:''})
  }

  public render() {
    const {description} = this.state
    const suffix = description ? <EnterOutlined onClick={this.addTodo}/> : <span/>
    return (
      <Input
        placeholder="添加新任务"
        suffix={suffix}
        value={description}
        onChange={ event => this.handleChange(event)}
        onKeyUp={event => this.onKeyUp(event)}
      />
    )
  }
}

export default TodoInput