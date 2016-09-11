/**
 * Created by eraarby on 2016-09-08.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash';
import {Grid, Row, Col, PageHeader, Button, ButtonGroup,Alert, InputGroup} from 'react-bootstrap';
import mimeTypes from '../core/mimeTypes';
import HarEntryTable from './HarEntryTable';
import harParser from '../core/har-parser';


export default class HarViewer extends  React.Component {
    constructor(props, context){
        super(props, context);
        this.state = this._initialState();
    }

    _initialState(){
        return {
            activeHar: null,
            sortKey: null,
            sortDirection: null
        }
    }
    render(){
        var content = this.state.activeHar
            ? this._renderViewer(this.state.activeHar)
            : this._renderEmptyViewer();
       return(
               <div>
                   {this._renderHeader()}
                   {content}
               </div>
       );
    }

    _renderEmptyViewer(){
        return(
            <Grid fluid>
                <Row>
                    <Col sm={12}>
                        <p></p>
                        <Alert bsStyle="warning">
                            <strong>No HAR loaded</strong>
                        </Alert>
                    </Col>
                </Row>
            </Grid>
        );
    }
    _renderViewer(har){
        var pages = harParser.parse(har),
            currentPage = pages[0];
        var entries = this._sortEntriesByKey(this.state.sortKey, this.state.sortDirection, currentPage.entries);
        return(
            <Grid fluid>
                <Row>
                    <Col sm={12}>
                        <HarEntryTable
                            entries={entries}
                            onColumnSort={this._onColumnSort.bind(this)}
                        >
                        </HarEntryTable>
                    </Col>
                </Row>
            </Grid>
        );
    }

    _renderHeader(){
        var buttons =  _.map(_.keys(mimeTypes.types),(x) => {
            return this._createButton(x, mimeTypes.types[x].label);
        });

        var options = _.map(window.samples, (s) => {
            return (<option key={s.id} value={s.id}>{s.label}</option>)
        });

        return(
            <Grid>
                <Row>
                    <Col sm={12}>
                        <PageHeader>Har Viewer</PageHeader>
                    </Col>

                    <Col sm={3} smOffset={9}>
                        <div>
                            <label className="control-label"></label>
                            <select ref="selector" className="form-control" onChange={this._sampleChanged.bind(this)}>
                                <option value="">---</option>
                                {options}
                            </select>
                        </div>
                    </Col>

                </Row>

                <Row>
                    <Col sm={12}>
                        <p>Pie Chart</p>
                    </Col>
                </Row>

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

            </Grid>
        );

    }

    _sampleChanged(){
        var selection = this.refs.selector.value;// ReactDOM.findDOMNode(this.refs.selector).value;
        var har = selection
            ?_.find(window.samples, s =>s.id === selection).har
            :null;
        if(har){
            this.setState({activeHar: har});
        }else {
            this.setState(this._initialState());
        }
    }


    //--------------------------------
    //          Filtering
    //--------------------------------
    _createButton(type, label){
        var hadler = this._filterRequested.bind(this, type);
        return(
            <Button
                key={type}
                bsStyle="primary"
                active={this.state.type === type}
                onClick={hadler}
            >{label}
            </Button>
        );
    }

    _filterRequested(type, event){

    }

    _filterTextChanged(){

    }

    //--------------------------------
    //          Sorting
    //--------------------------------
    _onColumnSort(dataKey, direction){
        this.setState({
            sortKey: dataKey,
            sortDirection: direction
        });
    }

    _sortEntriesByKey(sortKey, sortDirection, entries ){
        if(_.isEmpty(sortKey) | _.isEmpty(sortDirection)) return entries;

        var keyMap = {
            url: 'request.url',
            time: 'time.start'
        }

        var getValue = function (entry) {
            var key = keyMap[sortKey] || sortKey;
            return _.get(entry, key);
        }

        var sorted = _.sortBy(entries, getValue);

        if(sortDirection === 'desc'){
            sorted.reverse();
        }

        return sorted;
    }
}

HarViewer.defaultProps={
    entries:[]
}
