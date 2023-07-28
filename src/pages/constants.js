export const addressTypes = {
    BB_PVZ: "BB_PVZ"
}

export const addressTypesDictionary = {
    BB_PVZ: "Boxberry"
}

export const PRODUCT_STATUS = {
    CREATED: 'created',
    APPROVED: 'approved',
    APPROVED_WITH_CHANGES: 'approved_with_changes',
    PAYMENT_CHECK: 'payment_check',
    PAID: 'paid',
    CANCELED: 'canceled',
}

export const PRODUCT_STATUS_DICTIONARY = {
    created: 'Проверка',
    approved: 'Готов к оплате',
    approved_with_changes: 'Готов к оплате. Цена товара изменилась',
    paid: 'Оплачен',
    canceled: 'canceled',
}


export const PRODUCT_DELIVERY_STATUS = {
    CREATED: 'created',
    POIZON_BOUGHT: 'poizon_bought',
    DELIVERY_TO_CHI_DEL_STR: 'delivery_to_chi_del_str',
    SORT_CHI_DEL_STR: 'sort_chi_del_str',
    DELIVERY_TO_RU_DEL_STR: 'delivery_to_ru_del_str',
    ARRIVED_RU_DEL_STR: 'arrived_ru_del_str',
    DELIVERY_CONSUMER_PVZ: 'delivery_consumer_pvz',
    ARRIVED_CONSUMER_PVZ: 'arrived_consumer_pvz',
    RECEIVED: 'received',
}

export const PRODUCT_DELIVERY_STATUS_DICTIONARY = {
    created: {title: 'Заказ создан', description: ''},
    poizon_bought: {title: 'Выкуплен c POIZON', description: 'Товар выкуплен с Poizon'},
    delivery_to_chi_del_str: {title: 'Доставка по Китаю', description: 'Отправлен на склад сервиса доставки в Китае'},
    sort_chi_del_str: {title: 'Сортировка', description: 'Сортировка на складе в Китае'},
    delivery_to_ru_del_str: {title: 'Отправлен в Россию', description: 'Отправлен на склад сервиса доставки в России'},
    arrived_ru_del_str: {title: 'Сортировка', description: 'Сортировка на складе в России'},
    delivery_consumer_pvz: {title: 'Отправлен в ПВЗ', description: 'Отправлен в выбранный ПВЗ'},
    arrived_consumer_pvz: {title: 'Готово к выдаче', description: 'Готов к выдаче в выбранном ПВЗ'},
    received: {title: 'Получен', description: ''},
}