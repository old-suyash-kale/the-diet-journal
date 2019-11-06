import $ from 'jquery';

/**
 * handling input validation;
 * @param {Object} o: input's object from state;
 */
function input(o) {
    return new Promise((resolve)=> {
        let {
                value, type, Type, // generic;
                Required, RequiredMessage, // for required;
                NumberMessage, // for number;
                EmailMessage, // for email;
                NoSpace, NoSpaceMessage, // for no space;
                NoSpecialCharacter, NoSpecialCharacterMessage, // for no special characters;
                Min, MinMessage,
                Max, MaxMessage,
                MinLength, MinLengthMessage,
                MaxLength, MaxLengthMessage,
                Pattern, PatternMessage,
                CustomPromise
            } = o,
            Error = [],
            pObj = Promise.resolve();
        
        if (Type === 'Input') {
            if (Required && !value) { // for required;
                if (!RequiredMessage) {
                    RequiredMessage = `Field is Required.`;
                }
                Error.push(RequiredMessage);
            }
            if (type === 'number' && isNaN(value)) { // for number;
                if (!NumberMessage) {
                    NumberMessage = `Not a valid Number.`;
                }
                Error.push(NumberMessage);
            }
            if (type === 'email' && !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) { // for email;
                if (!EmailMessage) {
                    EmailMessage = `Not a valid Email.`;
                }
                Error.push(EmailMessage);
            }
            if (NoSpace && value.indexOf(' ') >= 0) { // for no space;
                if (!NoSpaceMessage) {
                    NoSpaceMessage = `Space not allowed.`;
                }
                Error.push(NoSpaceMessage);
            }
            if (NoSpecialCharacter && /[^a-zA-Z0-9]/.test(value.replace(/ /g, ''))) { // for no special characters;
                if (!NoSpecialCharacterMessage) {
                    NoSpecialCharacterMessage = `Special characters not allowed.`;
                }
                Error.push(NoSpecialCharacterMessage);
            }
            if (Min && parseFloat(value) < parseFloat(Min)) { // for min number;
                if (!MinMessage) {
                    MinMessage = 'Must have {Min} characters.';
                }
                Error.push(MinMessage.replace(/{Min}/g, Min));
            }
            if (Max && parseFloat(value) > parseFloat(Max)) { // for max number;
                if (!MaxMessage) {
                    MaxMessage = 'Maximum {max} characters are allowed.';
                }
                Error.push(MaxMessage.replace(/{Max}/g, Max));
            }
            if (MinLength && value.length < MinLength) { // for min length;
                if (!MinLengthMessage) {
                    MinLengthMessage = 'Must be greate than {Min}.';
                }
                Error.push(MinLengthMessage.replace(/{Min}/g, MinLength));
            }
            if (MaxLength && value.length > MaxLength) { // for max length;
                if (!MaxLengthMessage) {
                    MaxLengthMessage = 'Must be less than {Max}.';
                }
                Error.push(MaxLengthMessage.replace(/{Max}/g, MaxLength));
            }
            if (Pattern && !(new RegExp(Pattern)).test(value)) { // for pattern;
                if (!PatternMessage) {
                    PatternMessage = 'Value is invalid.';
                }
                Error.push(PatternMessage);
            }
            
        }

        if (CustomPromise) {
            pObj = CustomPromise(o);
        }

        pObj
        .then(null, (err)=> {
            Error.push(err);
        })
        .finally(()=> {
            o.Error = Error.join(', ');
            resolve({ o });
        });

    });
};

/**
 * handling input change with validation;
 * @param {String} f: form key field in state;
 * @param {String} k: key of the input;
 * @param {String} v: value of the input;
 */
function change(f, k, v) {
    return new Promise((resolve, reject)=> {
        let fObj = this.state[f];
        if (fObj) {
            fObj = $.extend(true, {}, fObj);
            let iObj = fObj[k];
            iObj.value = v;
            handleChange(iObj)
            .then(({ o })=> {
                if (o) {
                    fObj[k] = o;
                    this.setState({ [f]: fObj });
                }
                resolve({ o });
            });
        }
    });
};

/**
 * handling input validation;
 * @param {Object} iObj: input's object from state;
 */
function handleChange(iObj) {
    let pObj = Promise.resolve();
    if (iObj.Type === 'Input') {
        pObj = input(iObj);
    }
    return pObj;
};

/**
 * handling for submit;
 * @param {String} f: form key feild in state;
 */
function submit(f) {
    return new Promise((resolve, reject)=> {
        let fObj = this.state[f],
            isError = false,
            pArr = [];
        if (fObj) {
            fObj = $.extend(true, {}, fObj);
            for (let k in fObj) {
                let iObj = fObj[k],
                    pObj = handleChange(iObj);
                pArr.push(pObj);
                pObj.then(res=> {
                    if (res && res.o) {
                        fObj[k] = res.o;
                        if (!isError && res.o.Error) {
                            isError = true;
                        }
                    }
                })
            };
        }
        Promise.all(pArr)
        .then(()=> {
            this.setState({ [f]: fObj },()=> {
                if (isError) {
                    reject();
                } else {
                    resolve();
                }
            });
        });
    });
};

/**
 * extracting value of input from form;
 * @param {String} f: form key field in state;
 * @param {Array} arr: key of input;
 */
function extract(f, arr) {
    let fObj = this.state[f],
        req = {};
    if (fObj) {
        fObj = $.extend(true, {}, fObj);
        for (let k in fObj) {
            if (arr.indexOf(k) >= 0) {
                let iObj = fObj[k],
                    v;
                if (iObj.Type === 'Input') {
                    v = iObj.value;
                }
                if (typeof v !== 'undefined') {
                    req[k] = v;
                }
            }
        }
    }
    return req;
};

export {
    change,
    submit,
    extract
};