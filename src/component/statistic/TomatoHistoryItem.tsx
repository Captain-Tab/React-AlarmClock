import * as React from 'react';
import {format} from 'date-fns';
import '../../style/TomatoHistoryItem.scss';
import {updateTomato} from '../../redux/action/TomatoAction';
import {connect} from 'react-redux';
import axios from '../../http/axios';

interface ITomatoHistoryProp {
  tomato: any,
  itemType: string
  updateTomato: (payload: any) => void
}

class TomatoHistoryItem extends React.Component<ITomatoHistoryProp, any> {

  showDescription() {
    if (this.props.tomato.description) {
      return this.props.tomato.description;
    } else {
      return '空';
    }
  }

  updateTomato = async (params: any) => {
    try {
      let response = await axios.put(`tomatoes/${this.props.tomato.id}`, params);
      this.props.updateTomato(response.data.resource);
      console.log(response.data.resource);
    } catch (e) {
      throw new Error(e);
    }
  };


  public render() {

    let action;
    let timeStamp: string = '';
    const timeSyntax = 'K:mm a';
    const startTime = format(new Date(this.props.tomato.created_at), timeSyntax);
    const endTime = format(new Date(this.props.tomato.ended_at), timeSyntax);

    if (this.props.itemType === 'finished') {
      timeStamp = `${startTime} - ${endTime}`;

      action = (<div className="action">
          <span onClick={() => this.updateTomato({manually_created: true})}>删除</span>
        </div>
      );
    } else if (this.props.itemType === 'aborted') {
      const date = format(new Date(this.props.tomato.updated_at), 'yyyy-MM-d');
      timeStamp = `${date} ${startTime}-${endTime}`;
      action = (<div className="action">
        <span onClick={() => this.updateTomato({aborted: false})}>恢复</span>
      </div>);
    }


    return (
      <div className="TomatoHistoryItem" id="TomatoHistoryItem">
        <div className="text">
          <span className="time">{timeStamp}</span>
          <span className="description">{this.showDescription()}</span>
        </div>
        <div className="action">
          {action}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
});

const mapDispatchToProps = {
  updateTomato
};

export default connect(mapStateToProps, mapDispatchToProps)(TomatoHistoryItem);
