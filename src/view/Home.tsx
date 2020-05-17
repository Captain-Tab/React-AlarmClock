import * as React from 'react';
import {Dropdown, Button, Menu, message} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {LogoutOutlined,SettingOutlined} from '@ant-design/icons/lib';
import history from '../http/history';
import axios from '../http/axios';
import Todo from '../component/todo/Todo'
import Tomato from '../component/tomato/Tomato';
import '../style/Home.scss'

interface IRouter {
  history: any
}

interface IindexState {
  user: any
}

const logOut =()=> {
  localStorage.setItem('x-token', '');
  history.push('/login')
  message.info('退出成功', 1);
}

const menu = (
  <Menu>
    <Menu.Item key="0">
      <SettingOutlined />个人设置
    </Menu.Item>

    <Menu.Item key="1" onClick={logOut}>
      <LogoutOutlined />退出账号
    </Menu.Item>

  </Menu>
);


class Home extends React.Component<IRouter, IindexState> {
  // eslint-disable-next-line
  constructor(props: any) {
    super(props);
    this.state = {
      user: {}
    };
    // this.logOut = this.logOut.bind(this);
  }

  login = () => {
    this.props.history.push('login');
  };



  async componentDidMount() {
    await this.receiveUserData();
  }

  receiveUserData = async () => {
    const response = await axios.get('me');
    this.setState({user: response.data});
  };


  public render() {
    return (
      <div className="Home" id="Home">
        <header>
          <span>Logo</span>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="link" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              用户 {this.state.user.account}<DownOutlined/>
            </Button>
          </Dropdown>
        </header>
        <main>
          <Tomato/>
          <Todo/>
        </main>
      </div>
    );
  }
}

export default Home;