
const verifyParams = (payload, payloadParams) => {
    const keysParams = Object.keys(payload);
    const keysAuthorized = payloadParams;
    let verify = [];
    keysParams.forEach((key) => {
        if (key == keysAuthorized[key]) verify.push(true);
    });
    if (verify.length == keysParams.length) return true;
    return false;
}

module.exports = { verifyParams };