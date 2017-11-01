import React, {Component} from 'react';

import {Sparklines, SparklinesLine, SparklinesBars, SparklinesReferenceLine} from 'react-sparklines';

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        let values = this
            .props
            .hashrates
            .map(r => r.hashrates.reduce((sum, x) => sum + x));

        return (
            <div
                style={{
                border: 'solid',
                borderColor: 'black',
                border: 'solid',
                background: 'white',
            }}>
                <Sparklines 
                    data={values} 
                    limit={50} 
                    width={100} 
                    height={20} 
                    
                    style={{marginTop: '30px', marginBottom: '-8px'}}
                    >
                    <SparklinesReferenceLine type="median"/>
                    
                      
                    <SparklinesLine
                        style={{
                            strokeWidth: '0.5',
                            marginBottom: '0px',
                    }}
                        color="black"/>

                </Sparklines>
            </div>
        );
    }
}
export default Graph;