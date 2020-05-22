import * as React from 'react';


interface IPolygonProps {
  data: any
  totalFinishedCount: number
}

class Polygon extends React.Component<IPolygonProps, any> {
  constructor(props:IPolygonProps) {
    super(props);
    // this.state={
    //   point:"0,59.5 20,59.5 30,49.5 228,0 238,0 238,59.5"
    // }
  }

  point =()=>{
    const dates = Object.keys(this.props.data).sort((a,b)=>{
      return Date.parse(a)-Date.parse(b)
    })

    const firstDay = dates[0]
    if(firstDay){
      let finishedCount = 0
      const lastDay =dates[dates.length-1]
      const range = Date.parse(lastDay)-Date.parse(firstDay)
      console.log(dates)
      const pointArr= dates.map(date=>{
        // 计算得到X的坐标值 = 改天减去第一天的值除以范围 , 最后 乘以240
          let xAxes =(Date.parse(date)-Date.parse(firstDay)) / range * 240
        finishedCount += this.props.data[date].length
        // 计算得到Y的坐标值 = 该天天完成的任务数量除以总任务数， 1减去上一个结果后， 乘以60
        let yAxes = (1 - (finishedCount/ this.props.totalFinishedCount) )* 60
        return `${xAxes}, ${yAxes}`
      })
      return ['0,60', ...pointArr,'240,60'].join(' ')
    }else {
      return "0,60 240,60 0,60"
    }
  }


  public render() {
    return (
      <div className="Component" id="Polygon">
        <svg>
          <polygon fill="rgba(215,78,78,0.1)" stroke="rgba(215,78,78,0.5)" strokeWidth="1"
                   points={this.point()}/>
        </svg>
      </div>
    );
  }
}

export default Polygon;
