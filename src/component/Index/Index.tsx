import * as React from 'react';

import {Button} from 'antd'


class Component extends React.Component<any>{
  // eslint-disable-next-line
  constructor(props:any) {
    super(props);
  }

  login=()=>{
    this.props.history.push('login')
  }

  public render() {
    return (
      <div>
        <Button onClick={this.login}>登录</Button>
      </div>
    )
  }
}

export default Component