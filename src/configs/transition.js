import { duration, delay } from 'scss/configs/_transition.scss';

const DURATION = parseInt(duration);
const DELAY = parseInt(delay);

const TIMEOUT = { appear: (DURATION/2), enter: DURATION, exit: DELAY }; // default timeout for react transition;

export {
    DURATION,
    DELAY,
    TIMEOUT
};