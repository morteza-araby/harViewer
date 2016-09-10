/**
 * Created by eraarby on 2016-09-08.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash';
import {Grid, Row, Col, PageHeader, Button, ButtonGroup, Input} from 'react-bootstrap';
import mimeTypes from '../core/mimeTypes';

const {Table, Column, Cell} = require('fixed-data-table');
const GutterWidth = 30;

require('fixed-data-table/dist/fixed-data-table.css');

export default class HarViewer extends  React.Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            isColumnResizing: false,
            columnWidths:{
                url: 500,
                size: 100,
                time: 200
            },
            tableWidth: 1000,
            tableHeight: 500
        }
    }

    render(){

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

               <Row>
                   <Col sm={12}>
                       <Table ref="entriesTable"
                           height={this.state.tableHeight}
                           width={this.state.tableWidth}
                           rowsCount={this.props.entries.length}
                           rowHeight={30}
                           headerHeight={30}
                           isColumnResizing={this.state.isColumnResizing}
                           rowGetter={this._getEntry.bind(this)}
                           onColumnResizeEndCallback={this._onColumnResized.bind(this)}
                       >
                           <Column
                               dataKey="url"
                               width={this.state.columnWidths.url}
                               isResizable={true}
                               flexGrow={null}
                               label="Url"/>
                           <Column
                               dataKey="size"
                               width={this.state.columnWidths.size}
                               isResizable={true}
                               label="Size"/>
                           <Column
                               dataKey="time"
                               width={this.state.columnWidths.time}
                               isResizable={true}
                               minWidth={200}
                               label="Timeline"/>
                       </Table>
                   </Col>
               </Row>

           </Grid>
       )
    }

    _onColumnResized(newColumnWidth, dataKey){
        var columnWidths = this.state.columnWidths;
        columnWidths[dataKey] = newColumnWidth;

        this.setState({columnWidths: columnWidths, isColumnResizing: false});
    }
    _getEntry(index){
        return this.props.entries[index];
    }

    _sampleChanged(){

    }
    //--------------------------------
    //          Table Resizing
    //--------------------------------
    componentDidMount(){
        window.addEventListener('resize', _.debounce(this._onResize,50, {leading: true, trailing:true}).bind(this));
        this._onResize();
    }
    _onResize(){
        //var parent = ReactDOM.findDOMNode(this).parentNode;
        var parent = ReactDOM.findDOMNode(this.refs.entriesTable).parentNode;//this.refs.entriesTable.getDOMNode().parentNode;

        this.setState({
            tableWidth: parent.clientWidth - GutterWidth,
            tableHeight: document.body.clientHeight - parent.offsetTop - GutterWidth * 0.5
        });
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
