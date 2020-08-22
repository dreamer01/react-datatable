const debounce = (func, delay) => {
  let currentCall;
  return function() {
    clearTimeout(currentCall);
    currentCall = setTimeout(() => func.apply(this, arguments), delay);
  };
};

export default debounce;
