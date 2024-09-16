const response = (status_code, data, message, res) => {
  res.status(status_code).json({
    payload: {
      status_code: status_code,
      data: data,
      message: message,
    },
    pagination: {
      prev: "",
      next: "",
      max: "",
    },
  });
};

module.exports = response;
