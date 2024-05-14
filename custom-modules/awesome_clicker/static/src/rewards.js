/** @odoo-module **/

/**
 * 
 * @returns {{description: String, apply: (model:ClickerModel)=>void, minLevel: number, maxLevel: number,}[]}
 */
function buildReward(){
    return [
        {
            description: "Get 1 click",
            apply(clicker) {
                    clicker.increment(1);
            },
            minLevel: 2,
        },
        {
            description: "+ 1 Clickbot",
            apply(clicker) {
                clicker.increment(1);
            },
            minLevel: 3,
        },
        {
            description: "+ 1 Clickbot",
            apply(clicker) {
                clicker.increment(1);
            },
            minLevel: 2,
        },
        {
            description: "Get 10 clicks",
            apply(clicker) {
                    clicker.increment(10);
            },
            minLevel: 3,
            maxLevel: 4,
            },
        {
            description: "Increase bot power!",
            apply(clicker) {
                    clicker.multipler += 1;
            },
            minLevel: 3,
        },
    ];
}

export const rewards = buildReward();