require('dotenv').config()
const fs = require("fs")

let data = fs.readFileSync("BUILD.txt", "utf-8")

// ЗАМЕНИТЬ {{ STYLE }} НА ИМЯ ФАЙЛА
const styleFiles = fs.readdirSync('./build/static/css')
const styleName = styleFiles.find((name) => name.match('.chunk.css$'))
data = data.replace(/{{ STYLE }}/, styleName)

// ЗАМЕНИТЬ {{ SCRIPT_NM }} НА ДОП СКРИПТ
const scriptFiles = fs.readdirSync('./build/static/js')
const scriptNMName = scriptFiles.find((name) => name.match('.chunk.js$'))
data = data.replace(/{{ SCRIPT_NM }}/, scriptNMName)

// ЗАМЕНИТЬ {{ SCRIPT_M }} НА ИМЯ ГЛАВНЫЙ СКРИПТ
const scriptMName = scriptFiles.filter((name) => name.match('^main.*chunk.js$'))
data = data.replace(/{{ SCRIPT_M }}/, scriptMName)

// ЗАМЕНИТЬ {{ SCRIPT_STORAGE }} НА ХРАНИЛИЩЕ СКРИПТА
const storage = process.env.BUILD_STORAGE
data = data.replace(/{{ SCRIPT_STORAGE }}/g, storage)


fs.writeFileSync(`./build/static/${process.env.BUILD_FILE}.js`, data)
