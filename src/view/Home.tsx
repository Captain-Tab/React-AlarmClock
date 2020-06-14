import * as React from 'react';
import {Dropdown, Button, Menu, message} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {LogoutOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons/lib';
import history from '../http/history';
import axios from '../http/axios';
import Todo from '../component/todo/Todo';
import Tomato from '../component/tomato/Tomato';
import {connect} from 'react-redux';
import {initTodo} from '../redux/action/TodoAction';
import {initTomato} from '../redux/action/TomatoAction';
import logoImg from '../assets/React-icon.svg';
import footerImg from '../assets/footer-logo.png'
import '../style/Home.scss';
import Statistics from '../component/statistic/Statistics';


interface IRouter {
  history: any
  initTodo: (params: any) => any
  initTomato: (params: any) => any
}

interface IindexState {
  user: any
}

const logOut = () => {
  localStorage.setItem('x-token', '');
  history.push('/login');
  message.success('退出成功', 1);
};

const onWait = () => {
  message.info('该功能正在开发', 3);
};

const menu = (
  <Menu>
    <Menu.Item key="0" onClick={onWait}>
      <SettingOutlined/>个人设置
    </Menu.Item>

    <Menu.Item key="1" onClick={logOut}>
      <LogoutOutlined/>退出账号
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
  }

  async componentDidMount() {
    await this.receiveUserData();
    await this.getTodos();
    await this.getTomato();
  }

  login = () => {
    this.props.history.push('login');
  };


  getTodos = async () => {
    try {
      const response = await axios.get('todos');
      const todoItem = response.data.resources.map((t: any) => Object.assign({}, t, {editing: false}));
      this.props.initTodo(todoItem);
    } catch (e) {
      throw new Error(e);
    }
  };

  getTomato = async () => {
    try {
      const response = await axios.get('tomatoes');
      this.props.initTomato(response.data.resources);
    } catch (e) {
      throw new Error(e);
    }
  };


  receiveUserData = async () => {
    const response = await axios.get('me');
    this.setState({user: response.data});
  };


  public render() {
    return (
      <div className="Home" id="Home">
        <header>
          <div>
            <img src={logoImg} alt="react-logo"/>
            <span>番茄时间管理</span>
          </div>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="link" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <UserOutlined/> {this.state.user.account}<DownOutlined/>
            </Button>
          </Dropdown>
        </header>

        <main>
          <Tomato/>
          <Todo/>
          <Statistics/>
        </main>


        <footer>
          <div className="sourceCode"><a href="https://github.com/Captain-Tab/React-AlarmClock">源码地址</a></div>
          <div className="mainTools">
            <span>主要技术</span>
            <img src={footerImg} alt="footer-logo"/>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
});

const mapDispatchToProps = {
  initTodo,
  initTomato
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);