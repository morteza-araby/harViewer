/**
 * Created by eraarby on 2016-09-11.
 */
import React from 'react';

import _ from 'lodash';
import {Grid, Row, Col, PageHeader, Button, ButtonGroup,Alert, InputGroup} from 'react-bootstrap';
import mimeTypes from '../core/mimeTypes';

const PropTypes = React.PropTypes;

export default class FilterBar extends  React.Component {
    constructor(){
        super();

        this.state = this._initialState();
    }
    _initialState(){
        return {
            type: 'all'
        }
    }

    render(){
        var buttons =  _.map(_.keys(mimeTypes.types),(x) => {
            return this._createButton(x, mimeTypes.types[x].label);
        });

        return(
        <Row>
            <Col sm={8}>
                <ButtonGroup bsSize="small">
                    {this._createButton('all', 'All')}
                    {buttons}
                </ButtonGroup>
            </Col>

            <Col sm={4}>
                <input
                    type="search"
                    placeholder="Search Url"
                    bsSize="small"
                    onChange={this._filterTextChanged.bind(this)}
                    ref="filterText" />
            </Col>
        </Row>
        );
    }
    //--------------------------------
    //          Filtering
    //--------------------------------
    _createButton(type, label){
        var handler = this._filterRequested.bind(this, type);
        return(
            <Button
                key={type}
                bsStyle="primary"
                active={this.state.type === type}
                onClick={handler}
            >{label}
            </Button>
        );
    }

    _filterRequested(type){
        this.setState({type: type});

        if(this.props.onChanged){
            this.props.onChanged(type);
        }
    }

    _filterTextChanged(){
        if(this.props.onFilterTextChanged){
            this.props.onFilterTextChanged(this.refs.filterText.value);
        }
    }
}

FilterBar.defaultProps = {
    onChanged: null,
    onFilterTextChanged: null
}

FilterBar.propTypes = {
    onChanged: PropTypes.func,
    onFilterTextChanged: PropTypes.func
}