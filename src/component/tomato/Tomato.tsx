import * as React from 'react';
import TomatoAction from './TomatoAction';
import '../../style/Tomato.scss'

class Tomato extends React.Component<any, any>{
  public render() {
    return (
      <div className="Tomato" id="Tomato">
        <TomatoAction/>
      </div>
    );
  }
}

export default Tomato