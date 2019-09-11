import $ from 'jquery';

function change(f, k, v) {
    function vInput(o) {
        return new Promise((done)=> {
            let {
                    value, type, Type, // generic;
                    Required, RequiredMessage, // for required;
                    NumberMessage, // for number;
                    EmailMessage, // for email;
                    NoSpace, NoSpaceMessage, // for no space;
                    NoSpecialCharacter, NoSpecialCharacterMessage, // for no special characters;
                } = o,
                Error = [];
            
            if (Type === 'Input') {
                if (Required && !value) { // for required;
                    if (!RequiredMessage) {
                        RequiredMessage = `Field is Required!`;
                    }
                    Error.push(RequiredMessage);
                }
                if (type === 'number' && isNaN(value)) { // for number;
                    if (!NumberMessage) {
                        NumberMessage = `Not a valid Number!`;
                    }
                    Error.push(NumberMessage);
                }
                if (type === 'email' && !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) { // for email;
                    if (!EmailMessage) {
                        EmailMessage = `Not a valid Email!`;
                    }
                    Error.push(EmailMessage);
                }
                if (NoSpace && value.indexOf(' ') >= 0) { // for no space;
                    if (!NoSpaceMessage) {
                        NoSpaceMessage = `Space not allowed!`;
                    }
                    Error.push(NoSpaceMessage);
                }
                if (NoSpecialCharacter && /[^a-zA-Z0-9]/.test(value.replace(/ /g, ''))) { // for no special characters;
                    if (!NoSpecialCharacterMessage) {
                        NoSpecialCharacterMessage = `Special characters not allowed!`;
                    }
                    Error.push(NoSpecialCharacterMessage);
                }
            }
    
            if (Error) {
                o.Error = Error.join(', ');
            }
            done({ o });
        });
    };
    return new Promise((resolve)=> {
        let fObj = this.state[f];
        if (fObj) {
            fObj = $.extend(true, {}, fObj);
            let iObj = fObj[k];
            iObj.value = v;
            if (iObj.Type === 'Input') {
                vInput(iObj)
                .then(({ o })=> {
                    fObj[k] = o;
                    this.setState({ [f]: fObj });
                    resolve(o);
                });
            }
        }
    });
};

function submit(f) {
    return new Promise((resolve, reject)=> {
    });
};

export {
    change,
    submit
};