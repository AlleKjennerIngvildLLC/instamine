import React, { Component } from 'react';
import { remote } from 'electron';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { Provider } from 'rebass';
import Notifications from 'react-notification-system-redux';


import theme from '../theme';
import Header from '../components/Header';
import minerActions from '../actions/miner';


const mapStateToProps = (state) => {
  return { miner: state.miner, notifications: state.notifications };
};

const mapDispatchToProps = (dispatch) => {
  const miner = bindActionCreators(minerActions, dispatch);
  return {
    systemStatus: () => {
      miner.systemStatus();
    },
    stopMiner: () => {
      miner.stop();
    }
  };
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isMaximized: false
    };
  }

  componentDidMount() {
    this.props.systemStatus();
  }

  close = () => {

    this.props.stopMiner();
    remote
      .getCurrentWindow()
      .close();
  }
  minimize = () => {
    remote
      .getCurrentWindow()
      .minimize();
  }

  toggleMaximize = () => {

    const currentWindow = remote.getCurrentWindow();
    if (this.state.isMaximized) {
      currentWindow.unmaximize();
    } else {
      currentWindow.maximize();
    }

    this.setState({
      isMaximized: !this.state.isMaximized
    });
  };

  render() {

    const { notifications } = this.props;

    //Optional styling
    const style = {
      NotificationItem: { // Override the notification item
        DefaultStyle: { // Applied to every notification, regardless of the notification level
          margin: '10px 5px 2px 1px'
        },

        success: { // Applied only to the success notification item
          color: 'red'
        }
      }
    };


    console.log(this.props)
    return (
      <Provider theme={theme}>
        <div className="window">
          <Header minimize={this.minimize} close={this.close} miner={this.props.miner} />
          <div style={{overflow: 'hidden'}} className="window-content">
            {this.props.children}
          </div>
          <footer className="toolbar toolbar-footer">
            <h1 className="title">Instamine</h1>
          </footer>
          <Notifications
            notifications={notifications}
            style={style}
          />
        </div>
      </Provider>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));