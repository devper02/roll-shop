window.addEventListener("click", (e) => {
  // Обьявляем переменную для счетчика
  let counter;

  // Проверяем клик строго по кнопкам + или -
  if (
    e.target.dataset.action === "plus" ||
    e.target.dataset.action === "minus"
  ) {
    // Находим обертку счетчика
    const counterWrapper = e.target.closest(".counter-wrapper");
    //  Находим div с числом счетчика
    counter = counterWrapper.querySelector("[data-counter]");
  }

  // Проверяем является ли элемент кнопкой плюс
  if (e.target.dataset.action === "plus") {
    counter.innerText = ++counter.innerText;
  }

  // Проверяем является ли элемент кнопкой минус
  if (e.target.dataset.action === "minus") {
    if (parseInt(counter.innerText) > 1) {
      counter.innerText = --counter.innerText;
    } else if (
      e.target.closest(".cart-wrapper") &&
      parseInt(counter.innerText) === 1
    ) {
      //  Проверка на наличие товара в корзине

      // Удаление товара из корзины
      e.target.closest(".cart-item").remove();

      // Отображение статуса корзины Пустая/Полная ?
      toggleCartStatus();

      // Пересчет общей стоимости товаров в корзине
      calcCartPriceAndDelivery();
    }
  }

  // Проверяем клик на + или - внтури корзины
  if (
    e.target.hasAttribute("data-action") &&
    e.target.closest(".cart-wrapper")
  ) {
    // Пересчет общей стоимости товаров в корзине
    calcCartPriceAndDelivery();
  }
});
