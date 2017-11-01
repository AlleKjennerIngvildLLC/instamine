import React, { Component } from 'react';
import Settings from '../components/Settings';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import minerActions from '../actions/miner';

const mapStateToProps = (state) => {

  return {settings: state.miner.settings};
};

const mapDispatchToProps = (dispatch) => {
  const miner = bindActionCreators(minerActions, dispatch);
  return {
    updateSettings: miner.updateSettings
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
