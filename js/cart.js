const cartWrapper = document.querySelector(".cart-wrapper");

// Отслеживаем клик на странице
window.addEventListener("click", (e) => {
  // Проверяем что клик был совершен по кнопку "Добавить в корзину"
  if (e.target.hasAttribute("data-cart")) {
    //   Находим карточку товара с товаром , внтури которой был совершен клик
    const card = e.target.closest(".card");
    // Собираем данные с этого товара и записываем их в единый обьект productInfo

    const productInfo = {
      id: card.dataset.id,
      imgSrc: card.querySelector(".product-img").getAttribute("src"),
      title: card.querySelector(".item-title").innerText,
      itmesInBox: card.querySelector("[data-items-in-box]").innerText,
      weight: card.querySelector(".price__weight").innerText,
      price: card.querySelector(".price__currency").innerText,
      counter: card.querySelector("[data-counter]").innerText,
    };

    // Проверять если ли уже такой товар в корзине
    const itemInCart = cartWrapper.querySelector(
      `[data-id="${productInfo.id}"]`
    );

    //  Если товар естьв корзине
    if (itemInCart) {
      const counterEl = itemInCart.querySelector("[data-counter]");
      counterEl.innerText =
        parseInt(counterEl.innerText) + parseInt(productInfo.counter);
    } else {
      // Если товара нет в корзине

      // Собранные данные подставим в шаблон для товара в корзине
      const cartItemHTMl = `
		<div class="cart-item" data-id="${productInfo.id}">
			<div class="cart-item__top">
			  <div class="cart-item__img">
				<img src="${productInfo.imgSrc}" alt="${productInfo.title}">
			</div>
		  <div class="cart-item__desc">
			 <div class="cart-item__title">${productInfo.title}</div>
			 <div class="cart-item__weight">${productInfo.counter} шт. / ${productInfo.weight}</div>
  
			 <!-- cart-item__details -->
			 <div class="cart-item__details">
				<!-- counter -->
				<div class="items items--small counter-wrapper">
				  <div class="items__control" data-action="minus">
					 -
				  </div>
				  <div class="items__current" data-counter>${productInfo.counter}</div>
				  <div class="items__control" data-action="plus">+</div>
				</div>
				<!-- counter -->
				<div class="price">
				  <div class="price__currency">${productInfo.price}</div>
				</div>
			 </div>
			 <!-- // cart-item__details -->
		  </div>
		</div>
	 </div>`;

      //   Отобразим товар в корзине
      cartWrapper.insertAdjacentHTML("beforeend", cartItemHTMl);
    }
    //  Сбрасываем счетчик на '1'
    card.querySelector("[data-counter]").innerText = "1";

    // Отображение статуса корзины Пустая/Полная ?
    toggleCartStatus();

    // Пересчет общей стоимости товаров в корзине
    calcCartPriceAndDelivery();
  }
});
