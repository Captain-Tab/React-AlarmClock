import * as React from 'react';
import {connect} from 'react-redux';
import {Badge, Tabs} from 'antd';
import {FileSyncOutlined, FileUnknownOutlined} from '@ant-design/icons/lib';
import {format} from 'date-fns';
import _ from 'lodash';
import TomatoHistoryItem from './TomatoHistoryItem';
import '../../style/TomatoHistory.scss'


interface ItomatoHistory {
  tomatoData: any[]
}

class TomatoHistory extends React.Component<ItomatoHistory, any> {
  constructor(props:ItomatoHistory) {
    super(props);
  }

  get finishedTomato() {
    return this.props.tomatoData.filter(t => t.ended_at && !t.aborted)
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
    const {TabPane} = Tabs;
    // console.log(this.finishedTomato)
    // console.log(this.dailyFinishedTomato)
    // console.log(this.finishedDate)
    // console.log(this.abortedData)
    const finishedTomatoList = this.finishedDate.map(date=>{
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
              <TomatoHistoryItem key={todo.id} tomato={todo}/>)}
          </div>
        </div>
      )
    })

    const abortedTomatoList = this.abortedData.map(todo =>{
      return(
        <TomatoHistoryItem key={todo.id} tomato={todo} />
      )
    })

    return (
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab={<span><FileSyncOutlined />已完成番茄</span>} key="1">
          <div className="TomatoHistory" id="TomatoHistory">
            {finishedTomatoList}
          </div>
        </TabPane>
        <TabPane tab={<span><FileUnknownOutlined />已中断番茄</span>} key="2">
          {abortedTomatoList}
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
