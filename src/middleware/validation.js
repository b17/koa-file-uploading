module.exports = function validation() {
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            if (!err.isJoi) {
                throw err;
            }
            ctx.status = 400;
            ctx.body = {
                message: err.message,
                details: err.details,
            };
            ctx.app.emit('error', err, ctx);
        }
    };
};