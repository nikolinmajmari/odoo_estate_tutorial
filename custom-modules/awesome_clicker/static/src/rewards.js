/** @odoo-module **/

function buildReward(){
    return [
        {
            description: "+ 1 click",
            apply(clicker) {
                    clicker.increment(1);
            },
            minLevel: 2,
        },
        {
            description: "+ 1 Clickbot",
            apply(clicker) {
                clicker.bots.clickBots.purchased += 1;
            },
            minLevel: 3,
        },
        {
            description: "+ 10 Clickbot",
            apply(clicker) {
                clicker.bots.clickBots.purchased += 10;
            },
            minLevel: 2,
        },
        {
            description: "+ 2 bigBots",
            apply(clicker) {
                clicker.bots.bigBots.purchased += 10;
            },
            minLevel: 3,
            maxLevel: 4,
            },
        {
            description: "+1 Multipler (Increase bot power)",
            apply(clicker) {
                    clicker.multipler += 1;
            },
            minLevel: 3,
        },
    ];
}

export const rewards = buildReward();