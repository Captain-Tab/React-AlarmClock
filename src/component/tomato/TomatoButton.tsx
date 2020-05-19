import * as React from 'react';
import {Button, Input, Modal,message} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import axios from '../../http/axios';
import {CloseCircleOutlined, EnterOutlined,ExclamationCircleOutlined} from '@ant-design/icons/lib';
import CountDown from './CountDown';
import '../../style/TomatoButton.scss';


interface ITomatoButtonProps {
  startButton: () => void
  unfinishedTomato: any
  updateTomato: (payload: any) => void
}

interface ITomatoButtonState {
  description: string
}

const { confirm } = Modal;

class TomatoButton extends React.Component<ITomatoButtonProps, ITomatoButtonState> {
  constructor(props: ITomatoButtonProps) {
    super(props);
    this.state = {
      description: ''
    };
    this.handleKeyUP = this.handleKeyUP.bind(this);
    this.addDescription = this.addDescription.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.abortTomato = this.abortTomato.bind(this);
    this.updateTomato = this.updateTomato.bind(this);
    this.showConfirm = this.showConfirm.bind(this)
  }

  onFinish = () => {
    this.forceUpdate();
  };

  handleKeyUP = (event: any) => {
    if (event.keyCode === 13 && this.state.description !== '') {
      this.addDescription();
      message.info('输入成功', 3);
    } else if (event.keyCode === 13 && this.state.description === '') {
      message.info('输入内容不能为空', 3);
    }
  };

  addDescription = () => {
    this.updateTomato({
      description: this.state.description,
      ended_at: new Date()
    });
    this.setState({description: ''});
  };

  showConfirm() {
    confirm({
      title: '温馨提醒',
      icon: <ExclamationCircleOutlined />,
      content: '您目前在一个番茄时间中，要放弃这个进程吗？',
      okText:'确认',
      onOk:()=> {
       this.abortTomato()
      },
      cancelText:'取消',
      onCancel() {

      },
    });
  }

  abortTomato = () => {
    document.title = `React-番茄时间管理`;
    this.updateTomato({aborted: true, ended_at:new Date()});
  };

  updateTomato = async (params: any) => {
    try {
      const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`,
        params
      );
      this.props.updateTomato(response.data.resource);
      this.setState({description: ''});

    } catch (e) {
      throw new Error(e);
    }
  };


  public render() {
    let html = <div/>;
    // 如果没有未完成的tomato数据对象
    if (this.props.unfinishedTomato === undefined) {
      html = <Button className="startButton"
                     type="primary"
                     shape="round"
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
        const suffix = this.state.description ? <EnterOutlined onClick={this.addDescription}/> : <span/>;
        html =
          <div className="inputWrapper">
            <Input placeholder="请输入刚刚完成的任务"
                   value={this.state.description}
                   suffix={suffix}
                   onChange={event => {this.setState({description: event.target.value});}}
                   onKeyUp={event => this.handleKeyUP(event)}
            />
            <CloseCircleOutlined onClick={this.showConfirm}/>
          </div>;
      } else if (timeNow - startedAt < duration) {
        // 显示倒计时
        const timer = duration - (timeNow - startedAt);
        html = (
          <div className="CountDownWrapper">
            <CountDown timer={timer}
                       onFinish={this.onFinish}
                       duration={duration}
                       abortTomato={this.showConfirm}
            />
          </div>
        );
      }
    }

    return (
      <div className="TomatoButton" id="TomatoButton">
        {html}
      </div>
    );
  }
}

export default TomatoButton;
