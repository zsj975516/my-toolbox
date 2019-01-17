module.exports = (options, app) => {
  return async(ctx, next) => {
    try {
      return await next();
    } catch (e) {
      think.logger.error(e);
      return ctx.body = {
        errno: 500,
        errmsg: e.message
      };
    }
  };
};
