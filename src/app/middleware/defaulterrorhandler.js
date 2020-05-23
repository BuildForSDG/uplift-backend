module.exports = (error, request, response, next) => {
  if (request.xhr) {
    console.error(error);
    return response.status(500).json({
      error: 'Something went wrong!!'
    });
  }
  return next(error);
};
