function vInput(fField, iField, iValue) {
    function validate(o) {
        return new Promise((done)=> {
            let {
                    value, type, Type, // generic;
                    Required, RequiredMessage, // for required;
                    NumberMessage, // for number;
                    EmailMessage, // for email;
                    NoSpace, NoSpaceMessage, // for no space;
                    NoSpecialCharacter, NoSpecialCharacterMessage, // for no special characters;
                } = o,
                InputMessage = [];
            
            if (Type === 'Input') {
                if (Required && !value) { // for required;
                    if (!RequiredMessage) {
                        RequiredMessage = `Field is Required!`;
                    }
                    InputMessage.push(RequiredMessage);
                }
                if (type === 'number' && isNaN(value)) { // for number;
                    if (!NumberMessage) {
                        NumberMessage = `Not a valid Number!`;
                    }
                    InputMessage.push(NumberMessage);
                }
                if (type === 'email' && !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) { // for email;
                    if (!EmailMessage) {
                        EmailMessage = `Not a valid Email!`;
                    }
                    InputMessage.push(EmailMessage);
                }
                if (NoSpace && value.indexOf(' ') >= 0) { // for no space;
                    if (!NoSpaceMessage) {
                        NoSpaceMessage = `Space not allowed!`;
                    }
                    InputMessage.push(NoSpaceMessage);
                }
                if (NoSpecialCharacter && /[^a-zA-Z0-9\-\/]/.test(value.replace(/ /g, ''))) { // for no special characters;
                    if (!NoSpecialCharacterMessage) {
                        NoSpecialCharacterMessage = `Special characters not allowed!`;
                    }
                    InputMessage.push(NoSpecialCharacterMessage);
                }
            }
    
            if (InputMessage) {
                o.InputMessage = InputMessage.join(', ');
            }
            done({ o });
        });
    };
    return new Promise((resolve)=> {
        let fObj = this.state[fField];
        if (fObj) {
            let iObj = fObj[iField];
            iObj.value = iValue;
            if (iObj.Type === 'Input') {
                validate(iObj)
                .then(({ o })=> {
                    fObj[iField] = o;
                    this.setState({ [fField]: fObj });
                    resolve(o);
                });
            }
        }
    });
};

function vForm(fObj) {
    return new Promise((resolve, reject)=> {
        let pArr = [];
    });
};

export {
    vInput,
    vForm
};