import React, {Component} from 'react';
import {
  Flex,
  Box,
  Heading,
  Input,
  Switch,
  Tooltip,
  Image
} from 'rebass';
import buildConfiguration from '../config.js';
import buildGPUConfiguration from '../config_nvidia.js';
import os from 'os';
import _ from 'lodash';
import {gunzip} from 'zlib';

export default class Settings extends Component {

  state = {
    walletAddress: '',
    nThreads: 1,
    enableGPU: false
  }

  componentWillMount() {
    this.setState(this.props.settings);
  }

  handleSubmit = (event) => {

    event.preventDefault();

    let config;
    if (this.state.enableGPU) {
      let gpu_threads_conf = this.buildGPUConfig();
      config = buildGPUConfiguration(gpu_threads_conf, this.state.walletAddress);

    } else {
      let cpu_threads_conf = this.buildCpuConfig(this.state.nThreads);
      config = buildConfiguration(cpu_threads_conf, this.state.walletAddress);
    }

    this.setState({
      config: config
    }, () => {
      this
        .props
        .updateSettings(this.state);
    });

  }

  buildCpuConfig = (n) => {
    let cpuSettings = _
      .range(n)
      .map(i => {
        return {'low_power_mode': false, 'no_prefetch': true, 'affine_to_cpu': i};

      });

    return cpuSettings;
  }

  buildGPUConfig = () => {
    let gpuSettings = [
      {
        'index': 0,
        'threads': 5,
        'blocks': 60,
        'bfactor': 8,
        'bsleep': 100,
        'affine_to_cpu': false
      }
    ];

    return gpuSettings;

  }

  render() {

    console.log(this.props.settings)

    let nCpus = os
      .cpus()
      .length;

    const {state} = this;

    return (
      <div className="pane-group">

        <Flex
          is="div"
          className="pane"
          wrap
          column={true}
          align="center"
          justify="center"
          style={{
          backgroundSize: 'cover',
          backgroundImage: 'url("./background.png")'
        }}>

          <Flex>

            <Heading fontSize={24} style={{
              color: 'white'
            }}>Monero (XMR) Settings
            </Heading>
          </Flex>

          <Flex>
            <Box width="400px">
              <div
                style={{
                background: '#f5f5f4',
                padding: '15px 15px 15px 15px',
                border: '1px solid #c2c0c2'
              }}>
                <form onSubmit={this.handleSubmit}>

                  <div className="row">
                    <div className="col-xs-12">

                      <div className="form-group">
                        <label>Wallet address</label>
                        <Input
                          style={{
                          background: 'white',
                          border: '1px solid #c2c0c2'
                        }}
                          onChange={(event) => this.setState({walletAddress: event.target.value})}
                          value={state.walletAddress}
                          type="text"
                          className="form-control"
                          placeholder=""/>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xs-12">
                      <div className="form-group">
                        <label>Threads</label>
                        <Input
                          style={{
                          background: 'white',
                          border: '1px solid #c2c0c2'
                        }}
                          onChange={(event) => {
                          let cpus = event.target.value;
                          cpus = _.min([nCpus, cpus]);
                          this.setState({nThreads: cpus});
                        }}
                          value={state.nThreads}
                          type="number"
                          min="1"
                          max={`${nCpus}`}
                          className="form-control"
                          placeholder=""/>
                      </div>
                    </div>
                  </div>

                  <div className="checkbox">
                    <label>
                      <input
                        defaultChecked={this.state.enableGPU}
                        type="checkbox"
                        onChange={(event) => {
                        this.setState({enableGPU: event.target.checked});
                      }}/>
                      Enable GPU
                    </label>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-form btn-primary">Save</button>
                  </div>
                </form>
              </div>
            </Box>
          </Flex>

          <Flex>
            <Box>
              <Image
                style={{
                marginTop: "-50px",
                height: '200px'
              }}
                src='./banner.png'/>
            </Box>
          </Flex>

        </Flex>

      </div>

    );
  }
}
