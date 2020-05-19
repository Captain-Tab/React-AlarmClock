import * as React from 'react';

interface ICountDownProps {
  timer: number
}

interface ICountDownState {
  countDown: number
}

class CountDown extends React.Component<ICountDownProps, ICountDownState> {
  constructor(props:ICountDownProps) {
    super(props);
    this.state ={
      countDown: this.props.timer
    }
  }

  componentDidMount() {
    setInterval(()=>{
      const time = this.state.countDown
      this.setState({countDown: time-1000})
      if (time < 0){
        // 通知父组件，完成倒计时
      }
    },1000)
  }

  public render() {

    const min = Math.floor(this.state.countDown/1000/60)
    const second = Math.floor(this.state.countDown/1000%60)

    const time  = `${min}:${second<10?`0${second}`:second}`

    return (
      <div className="CountDown">
        {time}
      </div>
    );
  }
}

export default CountDown;
