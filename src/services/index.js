import $ from 'jquery';
import { toast } from 'react-toastify';

import { BASE_URL, TOKEN_KEY } from 'configs/index';
import { defaultProps } from 'utils/index';

class Services {
    constructor(props) {
        this.props = props;

        this.success = this.success.bind(this);
        this.error = this.error.bind(this);
        this.toServer = this.toServer.bind(this);
    };

    toParams(o) {
        let s = '';
        for (var k in o) {
            let v = o[k];
            if (v) {
                s += s ? '&' : '?';
                s += k + '=' + encodeURIComponent(v);
            }
        }
        return s;
    };

    success(o) {
        let {s, m} = o;
        m = m ? m.join(', ') : false;
        if (s === 'e') {
            this.error(o);
        } else if (m) {
            let tconfig = {};
            if (s === 's') {
                tconfig.type = toast.TYPE.SUCCESS;
            } else if (s === 'w') {
                tconfig.type = toast.TYPE.WARNING;
            }
            toast(m, tconfig);
        }
    };

    error(o) {
        window.location.href = window.location.origin + '/#/Error/' + (o && o.m ? o.m.join(', ') : '');
    };

    toServer(props) {
        props = defaultProps(props, {async: true, type: 'GET', contentType: 'application/json', dataType: 'json'});
        let { url, async, type, contentType, dataType, data } = props,
            headers = {};
        if (this.oUser && this.oUser.token) {
            headers[TOKEN_KEY] = this.oUser.token;
        }
        if (type === 'GET' && data) {
            url += this.toParams(data);
            data = undefined;
        }
        if (data) {
            data = JSON.stringify(data);
        }
        let req = $.ajax({
            crossDomain: true,
            url: BASE_URL + url,
            headers,
            async,
            type,
            contentType,
            dataType,
            data
        });
        req.then(this.success, this.error);
        return req;
    };
};

export default Services;