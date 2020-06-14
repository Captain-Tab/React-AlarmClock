import * as React from 'react';
import {Button, Input,message} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import axios from '../http/axios'
import '../style/Login.scss';

interface ILogin {
  account: string,
  password: string,
}

class Login extends React.Component<any, ILogin> {
  constructor(props: any) {
    super(props);
    this.state = {
      account: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(key: keyof ILogin, value: string) {
    const newState: any = {};
    newState[key] = value;
    this.setState(newState);
  }

  handleSubmit = async () => {
    const {account, password} = this.state;
    if(password === '' || account === ''){
      message.warning('用户名或者密码不能为空',3)
    }else {
      try {
        await axios.post('sign_in/user', {
          account,
          password,
        });
        message.success('用户登录成功',1)
        this.props.history.push('/')
      } catch (e) {
           switch (e.response.status) {
             case 422:
               message.error('用户或者密码错误',3)
               break
             case 401:
               message.error('请求未被认证，发生失败',3)
               break
             default:  message.error('未知错误',3)
           }
      }
    }
  };


  public render() {
    const {account, password} = this.state;
    return (
      <div className="login" id="Login">
        <h1>登录番茄账号</h1>
        <Input
          placeholder="输入用户名"
          prefix={<UserOutlined className="site-form-item-icon"/>}
          value={account}
          onChange={(event => this.onChange('account', event.target.value))}
        />
        <Input.Password value={password}
                        placeholder="输入密码"
                        onChange={event => this.onChange('password', event.target.value)}
        />
        <Button type="primary" className="loginButton" onClick={this.handleSubmit}>登录</Button>
        <p>未注册用户, 请点击<Link to="/sign_up">注册</Link></p>
      </div>
    );
  }
}

export default Login;