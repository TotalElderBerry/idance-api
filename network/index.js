const { apis } = require("./apis");

/**
 * Check requested API endpoint exist
 * @param {string} apiName API endpoint
 * @returns true if endpoint exist
 */
function isAPIExist(apiName) {
    for (const a of apis) {
        return a === apiName;
    }

    return false;
}

module.exports = {
    isAPIExist
};