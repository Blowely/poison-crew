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
    created: 'Ождание оплаты',
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

export const usSizeConversionTable = {
    "3.5": { usMen: 3.5, usWomen: 5, eu: 35.5, uk: 2.5 },
    "4": { usMen: 4, usWomen: 5.5, eu: 36, uk: 3 },
    "4.5": { usMen: 4.5, usWomen: 6, eu: 36.5, uk: 3.5 },
    "5": { usMen: 5, usWomen: 6.5, eu: 37.5, uk: 4 },
    "5.5": { usMen: 5.5, usWomen: 7, eu: 38, uk: 4.5 },
    "6": { usMen: 6, usWomen: 7.5, eu: 38.5, uk: 5 },
    "6.5": { usMen: 6.5, usWomen: 8, eu: 39, uk: 5.5 },
    "7": { usMen: 7, usWomen: 8.5, eu: 40, uk: 6 },
    "7.5": { usMen: 7.5, usWomen: 9, eu: 40.5, uk: 6.5 },
    "8": { usMen: 8, usWomen: 9.5, eu: 41, uk: 7 },
    "8.5": { usMen: 8.5, usWomen: 10, eu: 42, uk: 7.5 },
    "9": { usMen: 9, usWomen: 10.5, eu: 42.5, uk: 8 },
    "9.5": { usMen: 9.5, usWomen: 11, eu: 43, uk: 8.5 },
    "10": { usMen: 10, usWomen: 11.5, eu: 44, uk: 9 },
    "10.5": { usMen: 10.5, usWomen: 12, eu: 44.5, uk: 9.5 },
    "11": { usMen: 11, usWomen: 12.5, eu: 45, uk: 10 },
    "11.5": { usMen: 11.5, usWomen: 13, eu: 45.5, uk: 10.5 },
    "12": { usMen: 12, usWomen: 13.5, eu: 46, uk: 11 },
    "12.5": { usMen: 12.5, usWomen: 14, eu: 47, uk: 11.5 },
    "13": { usMen: 13, usWomen: 14.5, eu: 47.5, uk: 12 },
    "13.5": { usMen: 13.5, usWomen: 15, eu: 48, uk: 12.5 },
    "14": { usMen: 14, usWomen: 15.5, eu: 48.5, uk: 13 },
    "14.5": { usMen: 14.5, usWomen: 16, eu: 49, uk: 13.5 },
    "15": { usMen: 15, usWomen: 16.5, eu: 49.5, uk: 14 },
    "15.5": { usMen: 15.5, usWomen: 17, eu: 50, uk: 14.5 },
    "16": { usMen: 16, usWomen: 17.5, eu: 50.5, uk: 15 },
    "16.5": { usMen: 16.5, usWomen: 18, eu: 51, uk: 15.5 },
    "17": { usMen: 17, usWomen: 18.5, eu: 51.5, uk: 16 },
    "17.5": { usMen: 17.5, usWomen: 19, eu: 52, uk: 16.5 },
    "18": { usMen: 18, usWomen: 19.5, eu: 52.5, uk: 17 },
    "18.5": { usMen: 18.5, usWomen: 20, eu: 53, uk: 17.5 },
    "19": { usMen: 19, usWomen: 20.5, eu: 53.5, uk: 18 },
    "19.5": { usMen: 19.5, usWomen: 21, eu: 54, uk: 18.5 },
    "20": { usMen: 20, usWomen: 21.5, eu: 54.5, uk: 19 },
    "20.5": { usMen: 20.5, usWomen: 22, eu: 55, uk: 19.5 },
    "21": { usMen: 21, usWomen: 22.5, eu: 55.5, uk: 20 },
    "21.5": { usMen: 21.5, usWomen: 23, eu: 56, uk: 20.5 },
    "22": { usMen: 22, usWomen: 23.5, eu: 56.5, uk: 21 }
};

export const BANKS = {
    't-bank': {
        src: 'https://yastatic.net/naydex/yandex-search/jh9KNi066/73cf2elA/6elCMGAnSC5I8Rz3ZWni2nuUCWteNoY9CceGangCUscIXtiQBP_gyWeiCbfRwaW11RpI1j-A4mEQr-SfVEQ8VL2d0zWhxt0KWMUJYzRId2pv9a1uG_ODWZ0ycsoN43KHbNwddVCs86p0sHsEFhYiwmLO_afL1USy8',
        card_number: '',
        link: '',
        qr: ''
    },
    'sber': {
        src: 'https://firebasestorage.googleapis.com/v0/b/icon-finder-91d39.appspot.com/o/icons%2Fbrand%2Fsberbank.svg?alt=media&token=35f47b59-2261-470b-a499-2aaff90fdf0f',
        card_number: '',
        link: '',
        qr: ''
    }
}

export const PRODUCT_PROPERTIES = {
    MAIN_ARTICLE_NUMBER: 'MAIN_ARTICLE_NUMBER',
    SALE_PRICE: "SALE_PRICE",
    APPLICABLE_SEASON: "APPLICABLE_SEASON"
}

export const SORT_OPTIONS= [
    { value: 'by-relevance', label: 'Популярные' },
    { value: 'cheap-first', label: 'Дешевле' },
    { value: 'expensive-first', label: 'Дороже' },
]

export const SORT_TYPES = {
    'by-relevance': 'Популярные',
    'cheap-first': 'Дешевле',
    'expensive-first': 'Дороже',
}

export const COLOR_LIST = [
    { name: "Бежевый", color: "#d2b48c", hex: "d2b48c" },
    { name: "Белый", color: "#ffffff", hex: "ffffff" },
    { name: "Бирюзовый", color: "#40e0d0", hex: "40e0d0" },
    { name: "Бордовый", color: "#800020", hex: "800020" },
    { name: "Голубой", color: "#87ceeb", hex: "87ceeb" },
    { name: "Желтый", color: "#ffff00", hex: "ffff00" },
    { name: "Зеленый", color: "#00FF00", hex: "00FF00" },
    { name: "Золотой", color: "#FFD700", hex: "FFD700" },
    { name: "Коралловый", color: "#FF7F50", hex: "FF7F50" },
    { name: "Коричневый", color: "#964B00", hex: "964B00" },
    //{ name: "Серебряный", color: "linear-gradient(90deg, #C0C0C0, #D3D3D3)", hex: 'silver' },
    { name: "Красный", color: "#FF0000", hex: "FF0000" },
    { name: "Оранжевый", color: "#FFA500", hex: "FFA500" },
    { name: "Прозрачный", color: "#FFFFFF", hex: "FFFFFF" },
    { name: "Розовый", color: "#FFC0CB", hex: "FFC0CB" },
    { name: "Серый", color: "#808080", hex: "808080" },
    //{ name: "Мультиколор", color: "linear-gradient(90deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #8F00FF)", hex: "multi" },
    { name: "Синий", color: "#0000FF", hex: "0000FF" },
    { name: "Фиолетовый", color: "#7D3C98", hex: "7D3C98" },
    { name: "Фуксия", color: "#FF00FF", hex: "FF00FF" },
    { name: "Хаки", color: "#808000", hex: "808000" },
    { name: "Чёрный", color: "#000000", hex: "000000" }
];

export const APPAREL_SIZES_ORDER = ["XXXXXS", "XXXXS", "XXXS", "XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXXXL", "XXXXXL"]; // Приоритет сортировки


export const APPAREL_SIZES = [
    '5XS',
    '4XS',
    '3XS',
    '2XS',
    'XS',
    'S',
    'M',
    'L',
    'XL',
    '2XL',
    '3XL',
    '4XL',
    '5XL',
]

export const SIZES = [
    "35",
    "35.5",
    "36",
    "36.5",
    "37",
    "37.5",
    "38",
    "38.5",
    "39",
    "39.5",
    "40",
    "40.5",
    "41",
    "41.5",
    "42",
    "42.5",
    "43",
    "43.5",
    "44",
    "44.5",
    "45",
    "45.5",
    "46",
    "46.5",
    "47",
    "47.5",
    "48",
    "48.5",
    "49",
    "49.5",
    "50",
    "50.5",
    "51",
    "51.5",
    "52",
    "52.5"
];