import * as React from 'react';
import {connect} from 'react-redux';
import {Badge, Tabs} from 'antd';
import {FileSyncOutlined, FileUnknownOutlined} from '@ant-design/icons/lib';
import {format} from 'date-fns';
import _ from 'lodash';
import TomatoHistoryItem from './TomatoHistoryItem';
import '../../style/TomatoHistory.scss'
import {Pagination} from 'antd';

interface ItomatoHistory {
  tomatoData: any[]
}

class TomatoHistory extends React.Component<ItomatoHistory, any> {
  constructor(props:ItomatoHistory) {
    super(props);
    this.state = {
      minValue: 0,
      maxValue: 4
    };
  }


  handleChange = (value: any) => {
    if (value <= 1) {
      this.setState({
        minValue: 0,
        maxValue: 4
      });
    } else {
      this.setState({
        minValue: (value - 1) * 4,
        maxValue: (value - 1) * 4 + 4
      });
    }
  };

  get finishedTomato() {
    return this.props.tomatoData.filter(t => t.ended_at && !t.aborted && !t.manually_created)
  }

  // 运用了date_fns的format方法和loadash的_.groupBy方法，将数据为同一天的进行分组
  get dailyFinishedTomato() {
    return _.groupBy(this.finishedTomato, (todo) => {
      return format(new Date(todo.updated_at), 'yyyy-MM-d');
    });
  }

  get finishedDate() {
    return Object.keys(this.dailyFinishedTomato).sort((a,b)=> Date.parse(b) - Date.parse(a))
  }

  get abortedData(){
    return this.props.tomatoData.filter(t=>t.aborted)
  }



  public render() {


    const min = this.state.minValue;
    const max = this.state.maxValue;
    const {TabPane} = Tabs;
    const finishedTomatoList = this.finishedDate.slice(min,max).map(date=>{
      return (
        <div key={date} className="dailyTomato">
          <div className="summary">
            <div className="dateWrapper">
              <span className="date">{date}</span>
              <span className="weekday">{}</span>
            </div>

            <span className="finishCount">完成了 <Badge style={{backgroundColor: '#1890ff'}}
                                                     count={this.dailyFinishedTomato[date].length}/> 个任务</span>

          </div>
          <div className="tomatoList">
            {this.dailyFinishedTomato[date].map(todo =>
              <TomatoHistoryItem key={todo.id} tomato={todo} itemType="finished"/>)}
          </div>
        </div>
      )
    })

    const abortedTomatoList = this.abortedData.slice(min,max).map(todo =>{
      return(
        <TomatoHistoryItem key={todo.id} tomato={todo} itemType="aborted"/>
      )
    })

    return (
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab={<span><FileSyncOutlined />已完成番茄</span>} key="1">
          <div className="TomatoHistory">
            {finishedTomatoList}
          </div>
          <Pagination
            showTotal={total => `总计 ${this.finishedTomato.length} 个任务`}
            defaultCurrent={1}
            defaultPageSize={4}
            onChange={this.handleChange}
            total={this.finishedDate.length}

          />
        </TabPane>
        <TabPane tab={<span><FileUnknownOutlined />已中断番茄</span>} key="2">
          <div className="TomatoHistory">
          {abortedTomatoList}
          </div>
          <Pagination
            showTotal={total => `总计 ${this.abortedData.length} 个任务`}
            defaultCurrent={1}
            defaultPageSize={4}
            onChange={this.handleChange}
            total={this.abortedData.length}
          />
        </TabPane>
      </Tabs>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  tomatoData: state.TomatoReducer,
  ...ownProps
});

export default connect(mapStateToProps)(TomatoHistory)    ;
