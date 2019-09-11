import Services from 'services/';

class User extends Services {
    constructor(props) {
        super(props);

        this.oUser = null;
    };

    set(oUser) {
        this.oUser = oUser;
        return this;
    };

    domains() {
        return this.toServer({
            url: 'domain'
		});
    };

    signin(data) {
        return this.toServer({
            url: 'SignIn',
            type: 'POST',
			data
		});
    };

    roles() {
        return this.toServer({
            url: 'Roles',
            type: 'GET'
		});
    };

    list(data) {
        return this.toServer({
            url: 'Users',
            type: 'GET',
            data
		});
    };

};

let oUser = new User({});

export {
    User,
    oUser
};