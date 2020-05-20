import * as React from 'react';
import {format} from 'date-fns';
import '../../style/TomatoList.scss';
import {Timeline, Badge} from 'antd';

interface ITomatoListProps {
  finishedTomato: any
}


const TomatoItem = (props: any) => {

  const dailyArray: any = {};
  for (let key in props) {
    dailyArray[props[key].description] = format(new Date(props[key].ended_at), 'ha:mm');
  }

  return (
    <div className="TomatoItem">
      <Timeline>
        {Object.keys(dailyArray).map(key => {
          return (
            <Timeline.Item key={key} >
              <span style={{color: '#222'}}> {key}</span>
              <span style={{color: '#999', fontSize: '12px'}}>  完成于{dailyArray[key]}</span>
            </Timeline.Item>
          );
        })
        }
      </Timeline>
    </div>
  );
};


class TomatoList extends React.Component<ITomatoListProps, any> {


  get dates() {
    const dates = Object.keys(this.props.finishedTomato);
    return dates.sort((a, b) => Date.parse(b) - Date.parse(a)).splice(0, 3);
  }


  public render() {

    return (
      <div className="TomatoList" id="TomatoList">
        {this.dates.map(d => {
          const tomato = this.props.finishedTomato[d];
          return (
            <div key={d} className="dailyTomato">
              <div className="title">
                <span className="dateTime">{format(Date.parse(d), 'yyyy年M月dd日')}</span>
                <span className="finishedCount">完成了 <Badge style={{backgroundColor: '#1890ff'}} count={tomato.length}/> 个番茄任务</span>
              </div>
              <div className="TomatoItemWrapper">
                <TomatoItem {...tomato}/>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default TomatoList;
