import * as React from 'react';
import TomatoButton from './TomatoButton';
import '../../style/Tomato.scss';
import {connect} from 'react-redux';
import {addTomato, initTomato} from '../../redux/action/TomatoAction';
import axios from '../../http/axios';

interface ITomatoButton {
  todoTomato: any[]
  addTomato: (payload: any) => any
  initTomato: (payload: any[]) => any
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
    return this.props.todoTomato.filter(t => !t.description && !t.ended_at)[0];
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
      const response = await axios.post('tomatoes', {duration: 25 * 60 * 100});
      this.props.addTomato(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };

  public render() {
    return (
      <div className="Tomato" id="Tomato">
        <TomatoButton startButton={this.startButton}
                      unfinishedTomato={this.unfinishedTomato}/>
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
  initTomato
};

export default connect(mapStateToProps, mapDispatchToProps)(Tomato);