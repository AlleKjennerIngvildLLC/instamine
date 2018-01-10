import React, {Component} from 'react';

import MinerMenu from './MinerMenu';
import Statistics from './Statistics';

export default class Home extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (

      <div className="pane-group">
        <div
          className="pane-sm"
          style={{
          color: 'white',
          maxWidth: '300px',
          minWidth: '300px',
          background: '#426397'
        }}>
          <MinerMenu
            settings={this.props.miner.settings}
            status={this.props.miner.status}
            stopMiner={this.props.stopMiner}
            startMiner={this.props.startMiner}/>
        </div>

        <div
          className="pane"
          style={{
          overflow: 'hidden',
          borderColor: 'rgb(14, 49, 105)',
          color: 'white',
          backgroundSize: 'cover',
          backgroundImage: 'url("./background.png")'
        }}>

          <Statistics miner={this.props.miner}/>

        </div>

      </div>

    );
  }
}