/** @odoo-module **/

export const migrations  = [
    {
        fromVersion: 1,
        toVersion: 2,
        apply(state){
            state.version = 2;
            state.trees.peachTree = {
                purchased: 0,
                fruit: "peach",
                price: 1000000,
                level: 4
            }
            state.fruits.peach = 0;
            return state;
        }
    },
    {
        fromVersion: 2,
        toVersion: 2.1,
        apply(state){
            state.version = 2.1;
            return state;
        }
    },
    {
        fromVersion: 2.1,
        toVersion: 2.2,
        apply(state){
            state.version = 2.2;
            return state;
        }
    },
    {
        fromVersion: 2.2,
        toVersion: 3,
        apply(state){
            state.version = 3;
            state.trees.appleTree = {
                purchased: 0,
                fruit: "apple",
                price: 1000000,
                level: 4
            }
            state.fruits.apple = 0;
            return state;
        }
    }
];


