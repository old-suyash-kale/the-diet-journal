import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { anythingToArray } from 'utils/';

class Busy extends Component {
    render() {
        let { props } = this,
            { children, progress, blur, busy, type } = props,
            className = [...anythingToArray(props.className), 'busy'];
        if (blur) {
            className.push('filter-blur');
        }
        if (type && busy.indexOf(type) >= 0) {
            progress = true;
        }
        return(<div
            className={className.join(' ')}>
            {progress && <div className={'progress-animation'}>
                <div className={'progress-bar'}></div>
            </div>}
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
    blur: false
};


export default connect(({ busy })=> {
	return {
		busy
	};
})(Busy);