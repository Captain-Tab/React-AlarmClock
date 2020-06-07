import * as React from 'react';
import {format} from "date-fns";
import '../../style/TomatoHistoryItem.scss'


interface ITomatoHistoryProp {
  tomato: any
}

class TomatoHistoryItem extends React.Component<ITomatoHistoryProp, any> {

  public render() {

    // eslint-disable-next-line
    // let time
    // let timeSyntax: string = ''
    const timeSyntax = 'HH:mm';
    console.log(this.props.tomato);
    return (
      <div className="TomatoHistoryItem" id="TomatoHistoryItem">
         <div className="text">
           <span className="time">{format(new Date(this.props.tomato.started_at), timeSyntax)}-{format(new Date(this.props.tomato.updated_at), timeSyntax)} </span>
           <span className="description">{this.props.tomato.description}</span>
         </div>
      </div>
    );
  }
}

export default TomatoHistoryItem;
