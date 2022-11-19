function escape(s) {
    let lookup = {
        '&': '&amp;',
        '"': '&quot;',
        '<': '&lt;',
        '>': '&gt;',
    };
    return s.replace(/[&"<>]/g, (c) => lookup[c]);
}

module.exports = {
    escape,
};