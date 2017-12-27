import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import minerActions from '../actions/miner';

import MoneroNVIDIASettings from '../components/settings/MoneroNVIDIASettings';

const mapStateToProps = (state) => {
    return {settings: state.miner.settings};
};

const mapDispatchToProps = (dispatch) => {
    const miner = bindActionCreators(minerActions, dispatch);
    return {updateSettings: miner.updateSettings};
};

class MoneroNVIDIASettingsPage extends Component {
    render() {
        return (<MoneroNVIDIASettings {...this.props} />);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoneroNVIDIASettingsPage);
