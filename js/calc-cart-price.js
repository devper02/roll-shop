function calcCartPriceAndDelivery() {
  const cartItems = document.querySelectorAll(".cart-item");
  let totalPrice = 0;
  const totalPriceEl = document.querySelector(".total-price");
  const deliveryCost = document.querySelector(".delivery-cost");
  const cartDelivery = document.querySelector("[data-cart-delivery]");

  //   Обходим все блоки с ценами в корзине
  cartItems.forEach((item) => {
    // Находим кроличество товара
    const amountEl = item.querySelector("[data-counter]");
    const priceEl = item.querySelector(".price__currency");
    const currentPrice =
      parseInt(amountEl.innerText) * parseInt(priceEl.innerText);
    totalPrice += currentPrice;
  });
  //   Отображаем цену на страницу

  //   Скрываем или показываем блок со стоимостью доставки
  if (totalPrice > 0) {
    cartDelivery.classList.remove("none");
  } else {
    cartDelivery.classList.add("none");
  }

  //   Указываем стомость доставки
  totalPriceEl.innerText = totalPrice;
  if (totalPrice >= 600) {
    deliveryCost.classList.add("free");
    deliveryCost.innerText = "бесплатно";
  } else {
    deliveryCost.classList.remove("free");
    deliveryCost.innerText = "170 ₴";
  }
}
