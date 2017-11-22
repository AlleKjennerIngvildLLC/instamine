import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import minerActions from '../actions/miner';

import MoneroCPUSettings from '../components/settings/MoneroCPUSettings';

const mapStateToProps = (state) => {
    return {settings: state.miner.settings};
};

const mapDispatchToProps = (dispatch) => {
    const miner = bindActionCreators(minerActions, dispatch);
    return {updateSettings: miner.updateSettings};
};

class MoneroCPUSettingsPage extends Component {
    render() {
        return (<MoneroCPUSettings {...this.props} />);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoneroCPUSettingsPage);
