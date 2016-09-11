/**
 * Created by eraarby on 2016-09-11.
 */
import _ from 'lodash';

import Page from './Page';
import Entry from './Entry';

export default {
    parse: parse
};

function parse (har) {
    "use strict";

    var pageMap = {},
        pages = [];

    _.each(har.log.pages, (p) =>{
        var page = new Page(p);
        pageMap[p.id] = page;
        pages.push(page);
    });

    _.each(har.log.entries, (p) =>{
        var page = pageMap[p.pageref],
            entry = new Entry(p, page);

        page.entries.push(entry);
    });

    return pages;
}