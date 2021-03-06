import React, { Component } from 'react';
import ReactTable from 'react-table'

import _ from 'lodash';



export default class EventTable extends Component {

    constructor(props) {
        super(props);
    }

    render() {


        function getEventType(event) {
            let types = ["connection", "reply", "error", 
                         "end", "empty", "result", "job"];

            var eventType;
            for (var type of types) {
                if (event[type] !== undefined) {
                    eventType = type;
                    break;
                }
            }

            return eventType;
        }

        
        function transform(i, event) {

            var eventType = getEventType(event);

            let date = new Date(
                event.timestamp.seconds * 1000
                + event.timestamp.nanos / 1000
            );

            return { id: i, type: eventType, date: date };
        }

        let events = this.props.events.filter(
            event => {
                let type = getEventType(event);
                return type !== "reply";
            }


        ).map((i, event) => {
            return transform(event, i);
        });

        const columns = [{
            Header: 'Event type',
            accessor: 'type',
            
            // maxWidth: 200,
        }, {
            Header: 'Date',
            id: 'date',
            accessor: (d) => {
                return d.date.toString();
            }
            
            // maxWidth: 200,
        }];

        return (


            <ReactTable
                style={{
                    color: 'black',
                    background: 'white',
                    
                }}
                defaultPageSize={9}
                showPageSizeOptions={false}
                showPageJump={false}
                sortable={true}
                resizable={true}
                filterable={false}
                className="-striped -highlight"
                data={events}
                columns={columns}
            />

        );
    }
};