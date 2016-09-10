/**
 * Created by eraarby on 2016-09-10.
 */
import React from 'react';
import ReactDOM from 'react-dom';

require('fixed-data-table/dist/fixed-data-table.css');
const {Table, Column, Cell} = require('fixed-data-table');
const GutterWidth = 30;

export default class HarEntryTable extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isColumnResizing: false,
            columnWidths: {
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
}

HarEntryTable.defaultProps={
    entries:[]
}
