import * as React from 'react';
import {Button} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';


class TomatoButton extends React.Component<any, any> {

  public render() {
    return (
      <div className="TomatoAction" id="TomatoAction">
        <Button className="startButton"
                type="primary"
                onClick={()=>this.props.startButton()}
                icon={<PoweroffOutlined/>}>
          点击开始
        </Button>
      </div>
    );
  }
}

export default TomatoButton
