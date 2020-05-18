import * as React from 'react';
import {Button, Input, message} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import axios from '../../http/axios';
import CountDown from './CountDown';

interface ITomatoButtonProps {
  startButton: () => void
  unfinishedTomato: any
}

interface ITomatoButtonState {
  description: string
}

class TomatoButton extends React.Component<ITomatoButtonProps, ITomatoButtonState> {
  constructor(props: ITomatoButtonProps) {
    super(props);
    this.state = {
      description: ''
    };
    this.handleKeyUP = this.handleKeyUP.bind(this);
    this.addDescription = this.addDescription.bind(this);
  }

  handleKeyUP = (event: any) => {
    if (event.keyCode === 13 && this.state.description !== '') {
      this.addDescription();
    } else if (event.keyCode === 13 && this.state.description === '') {
      message.info('输入内容不能为空', 3);
    }
  };

  addDescription = async () => {
    try {
      const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`,
        {
          description: this.state.description,
          ended_at: new Date()
        });
      console.log(response);
      this.setState({description: ''});
    } catch (e) {
      throw new Error(e);
    }
  };

  public render() {
    let html = <div/>;
    console.log(this.props.unfinishedTomato);
    // 如果没有未完成的tomato数据对象
    if (this.props.unfinishedTomato === undefined) {
      html = <Button className="startButton"
                     type="primary"
                     onClick={() => this.props.startButton()}
                     icon={<PoweroffOutlined/>}>
        点击开始
      </Button>;
      // 如果返回的数据有tomato对象
    } else {
      const startedAt = Date.parse(this.props.unfinishedTomato.started_at);
      const duration = this.props.unfinishedTomato.duration;
      const timeNow = new Date().getTime();
      if (timeNow - startedAt > duration) {
        html =
          <div>
            <Input placeholder="请输入刚刚完成的任务"
                   value={this.state.description}
                   onChange={event => {this.setState({description: event.target.value});}}
                   onKeyUp={event => this.handleKeyUP(event)}
            />
          </div>;
      } else if (timeNow - startedAt < duration) {
        html = <CountDown/>;
      }
    }

    return (
      <div className="TomatoAction" id="TomatoAction">
        {console.log('html')}
        {html}
      </div>
    );
  }
}

export default TomatoButton;
