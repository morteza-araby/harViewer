/**
 * Created by eraarby on 2016-09-08.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash';
import {Grid, Row, Col, PageHeader, Button, ButtonGroup, Input} from 'react-bootstrap';
import mimeTypes from '../core/mimeTypes';
import HarEntryTable from './HarEntryTable';



export default class HarViewer extends  React.Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            entries: []
        }
    }

    render(){

        var buttons =  _.map(_.keys(mimeTypes.types),(x) => {
            return this._createButton(x, mimeTypes.types[x].label);
        });

       return(
               <Grid>
               {this._renderHeader()}
               <Row>
                   <Col sm={12}>
                       <HarEntryTable
                           entries={this.state.entries}
                       >
                       </HarEntryTable>
                   </Col>
               </Row>
               </Grid>
       )
    }

    _renderHeader(){
        var buttons =  _.map(_.keys(mimeTypes.types),(x) => {
            return this._createButton(x, mimeTypes.types[x].label);
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
                            <select className="form-control" onChange={this._sampleChanged.bind(this)}>
                                <option value="">---</option>
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

}

HarViewer.defaultProps={
    entries:[]
}
