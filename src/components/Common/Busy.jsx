import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import anythingToArray from 'utils/anythingToArray.js';

class Busy extends Component {
    render() {
        let { props } = this,
            { children, progress, blur, busy, Busy, type } = props,
            className = [...anythingToArray(props.className), 'busy'],
            isBusy = busy || (type && Busy.includes(type));
        if (isBusy && blur) {
            className.push('filter-blur');
        }
        return(<div
            className={className.join(' ')}>
            {isBusy && progress ? <div className={'progress-animation'}>
                <div className={'progress-bar'}></div>
            </div> : null}
            {Children.map(children, child =>
                cloneElement(child, {
                    progress: (progress ? 1 : 0),
                    blur: (blur ? 1 : 0)
                })
            )}
        </div>);
    };
};

Busy.propTypes = {
    progress: PropTypes.bool,
    blur: PropTypes.bool,
    type: PropTypes.string
};

Busy.defaultProps = {
    progress: false,
    blur: true
};


export default connect(({ busy })=> {
	return {
		Busy: busy
	};
})(Busy);