// Задача № 1. Кеш последних пяти различных наборов аргументов.
function cachingDecoratorNew(func) {
  const cache = [];

  return function (...args) {
    const hash = md5(JSON.stringify(args));
    const cachedResult = cache.find(function (item) {
      return item.hash === hash;
    });

    if (cachedResult) {
      return 'Из кеша: ' + cachedResult.value;
    }

    const result = func.apply(this, args);
    cache.push({ hash: hash, value: result });

    if (cache.length > 5) {
      cache.shift();
    }

    return 'Вычисляем: ' + result;
  };
}

// Задача № 2. Первый вызов немедленный, остальные — после паузы.
function debounceDecoratorNew(func, delay) {
  let timeoutId;

  function wrapper(...args) {
    wrapper.allCount += 1;

    if (wrapper.allCount === 1) {
      wrapper.count += 1;
      return func.apply(this, args);
    }

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      wrapper.count += 1;
      func.apply(this, args);
    }, delay);
  }

  wrapper.count = 0;
  wrapper.allCount = 0;

  return wrapper;
}
