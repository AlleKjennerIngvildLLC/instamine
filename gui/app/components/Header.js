import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {

        return (
            <header
                className="toolbar toolbar-header"
                style={{
                'WebkitAppRegion': 'drag',
                'WebkitUserSelect': 'none'
            }}>
                 {/* <h1 className="title">Instamine</h1>  */}

                <div className="toolbar-actions">

                    <div className="btn-group">
                        <button className="btn btn-default" onClick={this.props.close}>
                            <span className="icon icon-cancel"></span>
                        </button>
                        <button className="btn btn-default" onClick={this.props.minimize}>
                            <span className="icon icon-window"></span>
                            <span/>
                        </button>
                    </div>

                    <div className="btn-group">
                        <Link to="/">
                            <button className="btn btn-default">
                                <span className="icon icon-home"></span>
                            </button>
                        </Link>
                        <Link to="/settings">
                            <button className="btn btn-default">
                                <span className="icon icon-folder"></span>
                            </button>
                        </Link>
                    </div>
                    <button className="btn btn-default btn-dropdown pull-right">
                        <span className="icon icon-megaphone"></span>
                    </button>
                </div>
            </header>
        )
    }
}

export default Header;