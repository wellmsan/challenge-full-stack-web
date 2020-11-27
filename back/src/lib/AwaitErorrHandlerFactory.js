//middleware to hanlde errors 
const awaitErorrHandlerFactory = middleware => {
    return async (req, res, next) => {
      try {
        await middleware(req, res, next);
      } catch (err) {
        next(err);
      }
    };
  };

export default awaitErorrHandlerFactory