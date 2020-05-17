import * as React from 'react';
import axios from '../../http/axios';
import {Button} from 'antd';
import {PoweroffOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import {addTomato} from '../../redux/action/TomatoAction';


class TomatoAction extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state={

    }
    this.startButton = this.startButton.bind(this);
  }


  startButton = async () => {
    try {
      const response = await axios.post('tomatoes',{duration: 25 * 60 * 100})
      console.log(response);
    }catch (e) {
      throw new Error(e)
    }
  };


  public render() {
    return (
      <div className="TomatoAction" id="TomatoAction">
        <Button className="startButton"
                type="default"
                onClick={this.startButton}
                icon={<PoweroffOutlined/>}>
          点击开始
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todoTomato: state.TomatoReducer,
  ...ownProps
});

const mapDispatchToProps = {
  addTomato,
};


export default connect(mapStateToProps,mapDispatchToProps)(TomatoAction);
