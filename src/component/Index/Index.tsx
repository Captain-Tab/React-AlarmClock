import * as React from 'react';
import {Button, message} from 'antd';
import axios from '../../http/axios';

interface IRouter {
  history: any
}

interface IindexState {
  user: any
}

class Index extends React.Component<IRouter, IindexState> {
  // eslint-disable-next-line
  constructor(props: any) {
    super(props);
    this.state = {
      user: {}
    };
    this.logOut= this.logOut.bind(this)
  }

  login = () => {
    this.props.history.push('login');
  };

  logOut(){
   localStorage.setItem('x-token','')
    this.props.history.push('/login')
    message.info('退出成功',1)
  }

  async componentDidMount() {
    await this.receiveUserData();
  }

  receiveUserData = async () => {
    try {
      const response = await axios.get('me');
      this.setState({user: response.data});
    } catch (e) {
      // console.error('获取信息失败');
      // if(e.response.status === 401){
      //   this.props.history.push('login')
      // }
    }
  };


  public render() {
    return (
      <div>
        <p>欢迎用户 {this.state.user.account}</p>
        <Button onClick={this.logOut}>退出账号</Button>
      </div>
    );
  }
}

export default Index;