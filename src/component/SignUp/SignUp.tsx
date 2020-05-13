import * as React from 'react';
import {Button, Input} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import axios from '../../http/axios'


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
    try {
      await axios.post('sign_up/user', {
        account,
        password,
        password_confirmation: passwordConfirm,
      });
      alert('成功')
    }catch (e) {
      throw new Error(e)
    }
  }

  public render() {
    const {account, password, passwordConfirm} = this.state;
    return (
      <div className="signup">
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
        <Button onClick={this.handleSubmit}>注册</Button>
      </div>
    );
  }
}

export default SignUp;