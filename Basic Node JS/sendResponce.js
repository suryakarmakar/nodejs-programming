const sendResponce = (data = [], error = '', message = '') => {
  return JSON.stringify({
    data,
    error,
    message,
  });
};

module.exports = sendResponce;

// we can exports our module different ways
