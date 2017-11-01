import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../components/Home';
import minerActions from '../actions/miner';

const mapStateToProps = (state) => {
  return {miner: state.miner};
};


const mapDispatchToProps = (dispatch, ownProps) => {

  const miner = bindActionCreators(minerActions, dispatch);
  return {

    startMiner: (config) => {
      miner.start(config);
    },

    stopMiner: () => {
      miner.stop();
    },

    reportStatus: () => {
      miner.systemStatus();
    },

    systemStatus: () => {
    },

    sagaReport: () => {
      dispatch({type: 'START_STATUS_REQUEST_SAGA'});
    }

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
