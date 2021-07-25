const homeRoute =           {path: "/", generate: () => ""} //Главная
const modificationsRoute =  {path: "/:vin", generate: (vin) => `/${vin}`} //Модификации
const modificationRoute =   {path: "/:vin/:car", generate: (hash) => `/${hash}`} //Модификация
const groupRoute =          {path: "/:vin/:car/:group", generate: (group) => `/${group}`} //Группа
const partRoute =           {path: "/:vin/:car/:group/:part", generate: (part) => `/${part}`} //Запчасть

const search =  {path: "/search/:make_model", generate: (make_model) => `/search/${make_model}`} // Поиск
const searchStep1 =  {path: "/search/:make_model/:step1", generate: (step1) => `${step1}`} // Поиск 1 шаг
const searchStep2 =  {path: "/search/:make_model/:step1/:step2", generate: (step2) => `${step2}`} // Поиск 1 шаг

export { homeRoute, modificationRoute, modificationsRoute, groupRoute, partRoute, search, searchStep1, searchStep2 }