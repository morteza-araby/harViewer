/**
 * Created by eraarby on 2016-09-10.
 */
import React from 'react';
import ReactDOM from 'react-dom';

require('fixed-data-table/dist/fixed-data-table.css');
const {Table, Column, Cell} = require('fixed-data-table');
const GutterWidth = 30;

var PropTypes = React.PropTypes;

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
            tableHeight: 500,
            sortDirection: {
                url: null,
                size: null,
                time: null
            }
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
                    headerRenderer={this._renderHeader.bind(this)}
                    isResizable={true}
                    cellDataGetter={this._readKey.bind(this)}
                    flexGrow={null}
                    label="Url"/>
                <Column
                    dataKey="size"
                    width={this.state.columnWidths.size}
                    headerRenderer={this._renderHeader.bind(this)}
                    cellDataGetter={this._readKey.bind(this)}
                    isResizable={true}
                    label="Size"/>
                <Column
                    dataKey="time"
                    width={this.state.columnWidths.time}
                    headerRenderer={this._renderHeader.bind(this)}
                    cellDataGetter={this._readKey.bind(this)}
                    isResizable={true}
                    minWidth={200}
                    label="Timeline"/>
            </Table>
        )
    }

    _readKey(key, entry){
        var keyMap = {
            url: 'request.url',
            time: 'time.start'
        };
        key = keyMap[key] || key;
        return _.get(entry, key);
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
    //          Table Sorting
    //--------------------------------
    _renderHeader(label, dataKey){
        var dir = this.state.sortDirection[dataKey],
            classMap = {
                asc: 'glyphicon glyphicon-sort-by-attributes',
                desc: 'glyphicon glyphicon-sort-by-attributes-alt'
            }
        var sortClass = dir ? classMap[dir] : '';
        return(
            <div className="text-primary sortable"
            onClick={this._columClicked.bind(this, dataKey)}>
                <strong>{label}</strong>
                &nbsp;
                <i className={sortClass}></i>
            </div>
        )
    }

    _columClicked(dataKey){
        var sortDirections = this.state.sortDirection,
            dir = sortDirections[dataKey];

        if(dir === null) {dir = 'asc';}
        else if(dir === 'asc') {dir = 'desc';}
        else if(dir === 'desc') {dir = null;}

        // Allow sort only on one column at the time
        //Reset all sorts
        _.each(_.keys(sortDirections), (x) => {
            sortDirections[x] = null;
        });
        sortDirections[dataKey] = dir;

        if(this.props.onColumnSort){
            this.props.onColumnSort(dataKey, dir);
        }
    }
}

HarEntryTable.defaultProps={
    entries:[],
    onColumnSort: null
}

HarEntryTable.propTypes = {
    entries: PropTypes.array,
    onColumnSort: PropTypes.func
}
