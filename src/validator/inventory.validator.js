
const verifyParams = (payload, keysAuthorized) => {
    const countkeys = Object.keys(keysAuthorized ).length;
    const keysParams = Object.keys(payload);
    let verify = [];
    keysParams.forEach((key) => {
        if (key == keysAuthorized[key]) verify.push(true);
    });
    if (verify.length == countkeys) return true;
    return false;
}

module.exports = { verifyParams };