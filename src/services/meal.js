import Services from 'services/';

function getMealTypes() {
    return new Promise((resolve)=> {
        setTimeout(()=> {
            resolve([
                {id: 1, name: 'Meal 1'},
                {id: 2, name: 'Meal 2'},
                {id: 3, name: 'Meal 3'},
                {id: 4, name: 'Meal 4'}
            ]);
        }, 1000);
    });
};

export {
    getMealTypes
};