import * as React from 'react';
import '../../style/Statistics.scss'
import {connect} from 'react-redux';
// import Polygon from './Polygon';
import _ from 'lodash';
import {format} from 'date-fns'
import TotalCount from './TotalCount';
import PotatoCount from './PotatoCount';
import TodoHistory from './TodoHistory';


interface IStatisticsProps {
  todoData: any[]
}

class Statistics extends React.Component<IStatisticsProps, any> {
  constructor(props:IStatisticsProps) {
    super(props);
    this.state = {
      render: '',
      activeClass: 1,
    }
  }

  ShowComponent(name:string, index: number){
    this.setState({render:name, activeClass: index})
  }

  renderComponent =()=>{
    switch (this.state.render) {
      case 'showHideTotalCount': return <TotalCount/>
      case 'showHidePotatoCount': return <PotatoCount/>
      case 'showHideMission': return <TodoHistory/>
      default: return <TotalCount/>
    }
  }

  get finishedTodo(){
    return this.props.todoData.filter(t=>t.completed)
  }

  get dailyTodo(){
    return _.groupBy(this.finishedTodo,(todo)=>{
      return format(new Date(todo.updated_at),'yyy-MM-d')
    })
  }

  public render() {
    return (
      <div className="Statistics" id="Statistics">
          <ul>
            <li className ={`${this.state.activeClass === 1? 'active' : ''}`}  onClick={()=>{this.ShowComponent('showHideTotalCount', 1)}}>统计</li>
            <li className ={`${this.state.activeClass === 2? 'active' : ''}`} onClick={()=>{this.ShowComponent('showHidePotatoCount', 2)}}>番茄历史</li>
            <li className ={`${this.state.activeClass === 3? 'active' : ''}`} onClick={()=>{this.ShowComponent('showHideMission', 3)}}>累计完成{this.finishedTodo.length}个任务
              {/*<Polygon data={this.dailyTodo} totalFinishedCount={this.finishedTodo.length}/>*/}
            </li>
          </ul>


          {/*<TodoHistory/>*/}
           <div className="InformationContainer">
             {this.renderComponent()}
           </div>
        </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todoData: state.TodoReducer,
  ...ownProps
});

// const mapDispatchToProps = {
// };

export default connect(mapStateToProps)(Statistics);
