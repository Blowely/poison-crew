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


export const PRODUCT_SERVICE_STATUS = {
    REGISTERED: 'registered',
    SEND_TO_CHINESE_DELIVERY: 'send_to_chinese_delivery',
    SORT_RUSSIA: 'sort_russia',
    SENT_TO_PVZ: 'sent_to_pvz',
    ARRIVED_IN_PVZ: 'pvz_arrived',
    RECEIVED: 'received'
}