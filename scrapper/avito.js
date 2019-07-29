// ==UserScript==
// @name         New Userscript
// @version      0.1
// @description  try to take over the world!
// @author       You
// @grant        none
// @include https://www.avito.ru/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// ==/UserScript==

function extractChildInfo(el) {
    for (let key in el) {
        if (key.indexOf("__reactEventHandlers") !== -1) {
            let props = el[key].children.props;
            return props !== undefined ? convertPropsToJson(props) : props;
        }
    }
}

function convertPropsToJson(props) {
    let res = {};
    let fields = ["id", "title", "address", "pricePure", "coords"]
    for (let i = 0; i < fields.length; i++) {
        let f = fields[i];
        res[f] = props[f];
    }
    return res;
}

function getRoot() {
    return $("div[class*='items-root-'")[0];
}

let sellStorage = {}

function sendUpdate(config) {
    let root = getRoot();
    if (config.writeLogs) {
        console.log("Root element", root);
    }
    if (root === undefined || !("children" in root) || root.children.length === 0) return;
    let newElements = [];
    Array.prototype.forEach.call(root.children, child => {
        let info = extractChildInfo(child);
        if (info !== undefined && !(info.id in sellStorage)) {
            sellStorage[info.id] = info;
            newElements.push(info);
        }
    });
    if (config.writeLogs) {
        console.log("New elements", newElements);
    }
    if (newElements.length > 0) {
        $.post(
            "http://localhost:8080/ticket",
            {newItems: newElements},
            () => console.log("request sent")
        );
    }
}

function runScrapper(config) {
    'use strict';
    config = config === undefined ? window.scrapper : config;
    if (!(config.enabled)) {
        console.log('scrapper disabled');
        return;
    };

    if (config.sendUpdates) {
        sendUpdate(config);
    }
    setTimeout(runScrapper, config.timeout || 1000, window.scrapper);
}

(function runLoader() {
    'use strict'
    console.log('scrapper enabled');
    window.scrapper = {
        enabled: true,
        sendUpdates: true,
        writeLogs: true,
        timeout: 5000
    };
    runScrapper(window.scrapper);
})();