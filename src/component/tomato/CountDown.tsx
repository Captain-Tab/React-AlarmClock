import * as React from 'react';
import '../../style/CountDown.scss';
import {StopOutlined} from '@ant-design/icons/lib';
import {Button} from 'antd';

interface ICountDownProps {
  timer: number,
  duration: number
  onFinish: () => void
  abortTomato:()=> void
}

interface ICountDownState {
  countDown: number
}

let timerID: NodeJS.Timeout;

class CountDown extends React.Component<ICountDownProps, ICountDownState> {
  constructor(props: ICountDownProps) {
    super(props);
    this.state = {
      countDown: this.props.timer
    };
  }

  get countDown() {
    const min = Math.floor(this.state.countDown / 1000 / 60);
    const second = Math.floor(this.state.countDown / 1000 % 60);
    return `${min < 10 ? `0${min}` : min}:${second < 10 ? `0${second}` : second}`;
  }

  componentDidMount() {
    timerID = setInterval(() => {
      const time = this.state.countDown;
      document.title = `${this.countDown}-React 番茄时间管理`;
      this.setState({countDown: time - 1000});
      if (time < 1000) {
        // 通知父组件，完成倒计时
        this.props.onFinish();
        clearInterval(timerID);
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(timerID);
  }

  public render() {
    const percent = this.state.countDown / this.props.duration;

    return (
      <div className="CountDown" id="CountDown">
        <Button icon={<StopOutlined/>}
                shape="round"
                type="dashed"
                onClick={this.props.abortTomato}
        >
          <span className="restTime"> 倒计时 {this.countDown}</span>
        </Button>
        <div className="progress" style={{width: `${percent * 100}%`}}>
        </div>
      </div>

    );
  }
}

export default CountDown;
