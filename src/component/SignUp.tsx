import * as React from 'react';
import {Button, Input, message} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import axios from '../http/axios';
import '../style/SignUp.scss';

interface ISignUp {
  account: string,
  password: string,
  passwordConfirm: string
}

class SignUp extends React.Component<any, ISignUp> {
  constructor(props: any) {
    super(props);
    this.state = {
      account: '',
      password: '',
      passwordConfirm: ''
    };
    this.onChangeAccount = this.onChangeAccount.bind(this);
    this.onChangPassword = this.onChangPassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeAccount(e: any) {
    this.setState(
      {
        account: e.target.value
      }
    );
  }

  onChangPassword(e: any) {
    this.setState(
      {
        password: e.target.value
      }
    );
  }

  onChangePasswordConfirm(e: any) {
    this.setState(
      {
        passwordConfirm: e.target.value
      }
    );
  }

  handleSubmit = async () => {
    const {account, password, passwordConfirm} = this.state;
    if (password !== passwordConfirm) {
      message.info('注册失败，密码不一致', 3);
    } else if (account.length < 5) {
      message.info('注册失败，用户名过短', 3);
    } else {
      try {
        await axios.post('sign_up/user', {
          account,
          password,
          password_confirmation: passwordConfirm,
        });
        message.info('账号注册成功', 3);
      } catch (e) {
        throw new Error(e);
      }
    }
  };


  public render() {
    const {account, password, passwordConfirm} = this.state;
    return (
      <div className="signup" id="SignUp">
        <h1>注册番茄账号</h1>
        <Input
          placeholder="输入用户名"
          prefix={<UserOutlined className="site-form-item-icon"/>}
          value={account}
          onChange={this.onChangeAccount}
        />
        <Input.Password value={password}
                        placeholder="输入密码"
                        onChange={this.onChangPassword}
        />
        <Input.Password value={passwordConfirm}
                        placeholder="确认密码"
                        onChange={this.onChangePasswordConfirm}
        />
        <Button type="primary" className="signUpButton" onClick={this.handleSubmit}>注册</Button>
        <p>已注册用户, 请点击<Link to="/login">登录</Link></p>
      </div>
    );
  }
}

export default SignUp;