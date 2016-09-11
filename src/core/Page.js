/**
 * Created by eraarby on 2016-09-11.
 */
import _ from 'lodash';

export default class Page {
    constructor(harPage){
        "use strict";

        this.id = harPage.id;
        this.startedDateTime = harPage.startedDateTime;
        this.pageTimings = _.clone(harPage.pageTimings);
        this.entries = [];
    }
}