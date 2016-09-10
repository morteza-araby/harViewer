/**
 * Created by eraarby on 2016-09-08.
 */
import React from 'react';
import _ from 'lodash';
import {Grid, Row, Col, PageHeader, Button, ButtonGroup, Input} from 'react-bootstrap';

const {Table, Column, Cell} = require('fixed-data-table');

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
       return(
           <Grid>
               <Row>
                   <Col sm={12}>
                       <PageHeader>Har Viewer</PageHeader>
                   </Col>
               </Row>
               <Row>
                   <Col sm={12}>
                       <Table
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
}

HarViewer.defaultProps={
    entries:[]
}
