import * as React from 'react';
import TomatoButton from './TomatoButton';
import TomatoList from './TomatoList';
import '../../style/Tomato.scss';
import {connect} from 'react-redux';
import {addTomato, initTomato,updateTomato} from '../../redux/action/TomatoAction';
import axios from '../../http/axios';
import _ from 'lodash'
import {format} from 'date-fns'




interface ITomatoButton {
  todoTomato: any[]
  addTomato: (payload: any) => any
  initTomato: (payload: any[]) => any
  updateTomato: (payload: any)=> any
}

class Tomato extends React.Component<ITomatoButton, any> {
  constructor(props: ITomatoButton) {
    super(props);
    this.startButton = this.startButton.bind(this);
  }

  componentDidMount() {
    this.getTomato();
  }

  get unfinishedTomato() {
    return this.props.todoTomato.filter(t => !t.description && !t.ended_at && !t.aborted)[0];
  }

  get finishedTomato(){
    const finishedTomato = this.props.todoTomato.filter(t=> t.description && t.ended_at && !t.aborted)
    const obj =_.groupBy(finishedTomato,(tomato)=>{
      return format(new Date(tomato.started_at),'YYY-MM-d')
    })
    return obj
  }


  getTomato = async () => {
    try {
      const response = await axios.get('tomatoes');
      this.props.initTomato(response.data.resources);
    } catch (e) {
      throw new Error(e);
    }
  };


  startButton = async () => {
    try {
      const response = await axios.post('tomatoes', {duration: 25 * 60 * 1000});
      this.props.addTomato(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };

  public render() {
    return (
      <div className="Tomato" id="Tomato">
        <TomatoButton startButton={this.startButton}
                      unfinishedTomato={this.unfinishedTomato}
                      updateTomato={this.props.updateTomato}
        />
        <TomatoList finishedTomato={this.finishedTomato} />
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
  initTomato,
  updateTomato
};

export default connect(mapStateToProps, mapDispatchToProps)(Tomato);