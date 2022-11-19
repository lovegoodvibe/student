class UserError extends Error {
    constructor(code, message = '', params) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.params = params;

        Error.captureStackTrace(this, this.constructor);
    }
}

Object.defineProperty(UserError.prototype, 'toJSON', {
    value: function () {
        return {
            code: this.code,
            message: this.message,
            params: this.params,
        };
    },
    configurable: true,
    writable: true,
});

module.exports = {
    UserError,
};
