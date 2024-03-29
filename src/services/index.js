import $ from 'jquery';
import { toast } from 'react-toastify';

import store from 'utils/store.js';
import history from 'utils/history.js';
import { SERVICE_BASE_PATH, JWT_TOKEN_KEY } from 'configs/path.js';
import defaultProps from 'utils/defaultProps.js';

export default {
    toParams: function(o) {
        let s = '';
        for (var k in o) {
            let v = o[k];
            if (v) {
                s += s ? '&' : '?';
                s += k + '=' + encodeURIComponent(v);
            }
        }
        return s;
    },
    success: function(o) {
        let {s, m} = o;
        m = m ? m.join(', ') : false;
        if (s === 'e') {
            this.error(o);
        } else if (m) {
            let tconfig = {};
            if (s === 's') {
                tconfig.type = toast.TYPE.SUCCESS;
            } else if (s === 'w') {
                tconfig.type = toast.TYPE.ERROR;
            }
            toast(m, tconfig);
        }
    },
    error: function(o) {
        history.push(`/Error/${(o && o.m ? o.m.join(', ') : '')}`);
    },
    toServer: function(props) {
        props = defaultProps(props, {async: true, type: 'GET', contentType: 'application/json', dataType: 'json'});
        let { url, async, type, contentType, dataType, data } = props,
            headers = {},
            { user } = store.getState();
        if (user && user.token) {
            headers[JWT_TOKEN_KEY] = user.token;
        }
        data['platform'] = 1;
        if (type === 'GET' && data) {
            url += this.toParams(data);
            data = undefined;
        }
        if (data) {
            data = JSON.stringify(data);
        }
        let req = $.ajax({
            crossDomain: true,
            url: SERVICE_BASE_PATH + url,
            headers,
            async,
            type,
            contentType,
            dataType,
            data
        });
        req.then(this.success.bind(this), this.error.bind(this));
        return req;
    }
};