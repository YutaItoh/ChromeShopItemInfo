/* コンテキストメニューを作成 */
chrome.runtime.onInstalled.addListener(function (details) {
    const parent = chrome.contextMenus.create({
        id: "share",
        title: "Copy Amazon product data",
        contexts: ["page"],
    });
    chrome.contextMenus.create({
        parentId: parent,
        id: "amazon_url",
        title: "amazonの情報取得",
        contexts: ["page"],
    });
    chrome.contextMenus.create({
        parentId: parent,
        id: "amazon",
        title: "amazonの短縮URL情報取得",
        contexts: ["page"],
    });
    chrome.contextMenus.create({
        parentId: parent,
        id: "monotaro",
        title: "monotaroの情報取得",
        contexts: ["page"],
    });
    chrome.contextMenus.create({
        parentId: parent,
        id: "monotaro_url",
        title: "monotaroの短縮URL情報取得",
        contexts: ["page"],
    });
    chrome.contextMenus.create({
        parentId: parent,
        id: "thorlabs",
        title: "thorlabsの情報取得",
        contexts: ["page"],
    });
    chrome.contextMenus.create({
        parentId: parent,
        id: "thorlabs_url",
        title: "thorlabsの短縮URL情報取得",
        contexts: ["page"],
    });
});

/* コンテキストメニューがクリックされた時の処理 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "amazon":
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: copy_amazon,
            });
            break;
        case "monotaro":
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: copy_monotaro,
            });
            break;
        case "thorlabs":
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: copy_thorlabs,
            });
            break;
        case "amazon_url":
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: copy_amazon,
            });
            break;
        case "monotaro_url":
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: copy_monotaro,
            });
            break;
        case "thorlabs_url":
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: copy_thorlabs,
            });
            break;
    }
});

// // 無名関数エラーはそのうち対応
// function copt_info_to_clipboard(title, url, unit, price){
//     _text = title + '\t' + url + '\t' + unit + '\t' + price;
//     navigator.clipboard.writeText(_text);
// }

function copy_amazon() {
    _title = document.getElementById('productTitle').innerText;
    _url = "https://www.amazon.co.jp/dp/" + document.ue_pti;
    _price = document.querySelector("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span > span:nth-child(2) > span.a-price-whole").innerHTML;
    _unit = '1';
    _text = _title + '\t' + _url + '\t' + _unit + '\t' + _price;
    navigator.clipboard.writeText(_text);
//     copt_info_to_clipboard(_title, _url, _unit, _price);
}

function copy_monotarou() {
    _data_text = document.head.querySelectorAll('head script[type="application/ld+json"]')[1].innerText;
    _data_json = JSON.parse(_data_text);
    _brand = _data_json['brand']['name'];
    _product = _data_json['name'];
    _url = document.head.querySelector('[property="og:url"]').getAttribute('content');
    _unit = '1';
    _price = _data_json['offers']['price'];
    _text = _brand + ' ' + _product + '\t' + _url + '\t' + _unit + '\t' + _price;
    navigator.clipboard.writeText(_text);
}
function copy_thorlabs() {
    _title = document.head.querySelector('[name="Description"]').getAttribute('content');
    _product = _title.split(' ')[0];
    _url = 'https://www.thorlabs.co.jp/thorproduct.cfm?partnumber=' + _product;
    _unit = '1';
    _price = document.querySelector("body > main > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(5) > td:nth-child(2) > font").innerText;
    _price = _price.slice(1);
    _text = _title + '\t' + _url + '\t' + _unit + '\t' + _price;
    navigator.clipboard.writeText(_text);
}

function copy_amazon_url() {
    _url="https://www.amazon.co.jp/dp/"+ue_pti;
    navigator.clipboard.writeText(_url);
}

function copy_monotarou_url() {
    _url= document.head.querySelector('[property="og:url"]').getAttribute('content');
    navigator.clipboard.writeText(_url);
}
function copy_thorlabs_url() {
    _title     = document.head.querySelector('[name="Description"]').getAttribute('content');
    _product   =  _title.split(' ')[0];
    _url       = 'https://www.thorlabs.co.jp/thorproduct.cfm?partnumber='+_product;
    navigator.clipboard.writeText(_text);
}

// 世界各国のAmazon.comリスト
var documentUrlPatterns = [
    "http://www.amazon.co.jp/exec/obidos/ASIN/*",
    "http://www.amazon.co.jp/exec/obidos/tg/detail/-/*/*",
    "http://www.amazon.co.jp/exec/obidos/tg/detail/-/*",
    "http://www.amazon.co.jp/exec/obidos/*",
    "http://www.amazon.co.jp/o/tg/detail/-/*/*",
    "http://www.amazon.co.jp/o/tg/detail/-/*",
    "http://www.amazon.co.jp/o/ASIN/*",
    "http://www.amazon.co.jp/o/*",
    "http://www.amazon.co.jp/gp/product/product-description/*",
    "http://www.amazon.co.jp/gp/product/*",
    "http://www.amazon.co.jp/*/dp/*",
    "http://www.amazon.co.jp/*/dp/product-description/*",
    "http://www.amazon.co.jp/dp/*",
    "http://www.amazon.co.jp/*/dp/*",
    "https://www.amazon.co.jp/exec/obidos/ASIN/*",
    "https://www.amazon.co.jp/exec/obidos/tg/detail/-/*/*",
    "https://www.amazon.co.jp/exec/obidos/tg/detail/-/*",
    "https://www.amazon.co.jp/exec/obidos/*",
    "https://www.amazon.co.jp/o/tg/detail/-/*/*",
    "https://www.amazon.co.jp/o/tg/detail/-/*",
    "https://www.amazon.co.jp/o/ASIN/*",
    "https://www.amazon.co.jp/o/*",
    "https://www.amazon.co.jp/gp/product/product-description/*",
    "https://www.amazon.co.jp/gp/product/*",
    "https://www.amazon.co.jp/*/dp/*",
    "https://www.amazon.co.jp/*/dp/product-description/*",
    "https://www.amazon.co.jp/dp/*",
    "https://www.amazon.co.jp/*/dp/*",

    "http://www.amazon.com/exec/obidos/ASIN/*",
    "http://www.amazon.com/exec/obidos/tg/detail/-/*/*",
    "http://www.amazon.com/exec/obidos/tg/detail/-/*",
    "http://www.amazon.com/exec/obidos/*",
    "http://www.amazon.com/o/tg/detail/-/*/*",
    "http://www.amazon.com/o/tg/detail/-/*",
    "http://www.amazon.com/o/ASIN/*",
    "http://www.amazon.com/o/*",
    "http://www.amazon.com/gp/product/product-description/*",
    "http://www.amazon.com/gp/product/*",
    "http://www.amazon.com/*/dp/*",
    "http://www.amazon.com/*/dp/product-description/*",
    "http://www.amazon.com/dp/*",
    "http://www.amazon.com/*/dp/*",
    "https://www.amazon.com/exec/obidos/ASIN/*",
    "https://www.amazon.com/exec/obidos/tg/detail/-/*/*",
    "https://www.amazon.com/exec/obidos/tg/detail/-/*",
    "https://www.amazon.com/exec/obidos/*",
    "https://www.amazon.com/o/tg/detail/-/*/*",
    "https://www.amazon.com/o/tg/detail/-/*",
    "https://www.amazon.com/o/ASIN/*",
    "https://www.amazon.com/o/*",
    "https://www.amazon.com/gp/product/product-description/*",
    "https://www.amazon.com/gp/product/*",
    "https://www.amazon.com/*/dp/*",
    "https://www.amazon.com/*/dp/product-description/*",
    "https://www.amazon.com/dp/*",
    "https://www.amazon.com/*/dp/*",

    "http://www.amazon.co.uk/exec/obidos/ASIN/*",
    "http://www.amazon.co.uk/exec/obidos/tg/detail/-/*/*",
    "http://www.amazon.co.uk/exec/obidos/tg/detail/-/*",
    "http://www.amazon.co.uk/exec/obidos/*",
    "http://www.amazon.co.uk/o/tg/detail/-/*/*",
    "http://www.amazon.co.uk/o/tg/detail/-/*",
    "http://www.amazon.co.uk/o/ASIN/*",
    "http://www.amazon.co.uk/o/*",
    "http://www.amazon.co.uk/gp/product/product-description/*",
    "http://www.amazon.co.uk/gp/product/*",
    "http://www.amazon.co.uk/*/dp/*",
    "http://www.amazon.co.uk/*/dp/product-description/*",
    "http://www.amazon.co.uk/dp/*",
    "http://www.amazon.co.uk/*/dp/*",
    "https://www.amazon.co.uk/exec/obidos/ASIN/*",
    "https://www.amazon.co.uk/exec/obidos/tg/detail/-/*/*",
    "https://www.amazon.co.uk/exec/obidos/tg/detail/-/*",
    "https://www.amazon.co.uk/exec/obidos/*",
    "https://www.amazon.co.uk/o/tg/detail/-/*/*",
    "https://www.amazon.co.uk/o/tg/detail/-/*",
    "https://www.amazon.co.uk/o/ASIN/*",
    "https://www.amazon.co.uk/o/*",
    "https://www.amazon.co.uk/gp/product/product-description/*",
    "https://www.amazon.co.uk/gp/product/*",
    "https://www.amazon.co.uk/*/dp/*",
    "https://www.amazon.co.uk/*/dp/product-description/*",
    "https://www.amazon.co.uk/dp/*",
    "https://www.amazon.co.uk/*/dp/*",

    "http://www.amazon.fr/exec/obidos/ASIN/*",
    "http://www.amazon.fr/exec/obidos/tg/detail/-/*/*",
    "http://www.amazon.fr/exec/obidos/tg/detail/-/*",
    "http://www.amazon.fr/exec/obidos/*",
    "http://www.amazon.fr/o/tg/detail/-/*/*",
    "http://www.amazon.fr/o/tg/detail/-/*",
    "http://www.amazon.fr/o/ASIN/*",
    "http://www.amazon.fr/o/*",
    "http://www.amazon.fr/gp/product/product-description/*",
    "http://www.amazon.fr/gp/product/*",
    "http://www.amazon.fr/*/dp/*",
    "http://www.amazon.fr/*/dp/product-description/*",
    "http://www.amazon.fr/dp/*",
    "http://www.amazon.fr/*/dp/*",
    "https://www.amazon.fr/exec/obidos/ASIN/*",
    "https://www.amazon.fr/exec/obidos/tg/detail/-/*/*",
    "https://www.amazon.fr/exec/obidos/tg/detail/-/*",
    "https://www.amazon.fr/exec/obidos/*",
    "https://www.amazon.fr/o/tg/detail/-/*/*",
    "https://www.amazon.fr/o/tg/detail/-/*",
    "https://www.amazon.fr/o/ASIN/*",
    "https://www.amazon.fr/o/*",
    "https://www.amazon.fr/gp/product/product-description/*",
    "https://www.amazon.fr/gp/product/*",
    "https://www.amazon.fr/*/dp/*",
    "https://www.amazon.fr/*/dp/product-description/*",
    "https://www.amazon.fr/dp/*",
    "https://www.amazon.fr/*/dp/*",

    "http://www.amazon.de/exec/obidos/ASIN/*",
    "http://www.amazon.de/exec/obidos/tg/detail/-/*/*",
    "http://www.amazon.de/exec/obidos/tg/detail/-/*",
    "http://www.amazon.de/exec/obidos/*",
    "http://www.amazon.de/o/tg/detail/-/*/*",
    "http://www.amazon.de/o/tg/detail/-/*",
    "http://www.amazon.de/o/ASIN/*",
    "http://www.amazon.de/o/*",
    "http://www.amazon.de/gp/product/product-description/*",
    "http://www.amazon.de/gp/product/*",
    "http://www.amazon.de/*/dp/*",
    "http://www.amazon.de/*/dp/product-description/*",
    "http://www.amazon.de/dp/*",
    "http://www.amazon.de/*/dp/*",
    "https://www.amazon.de/exec/obidos/ASIN/*",
    "https://www.amazon.de/exec/obidos/tg/detail/-/*/*",
    "https://www.amazon.de/exec/obidos/tg/detail/-/*",
    "https://www.amazon.de/exec/obidos/*",
    "https://www.amazon.de/o/tg/detail/-/*/*",
    "https://www.amazon.de/o/tg/detail/-/*",
    "https://www.amazon.de/o/ASIN/*",
    "https://www.amazon.de/o/*",
    "https://www.amazon.de/gp/product/product-description/*",
    "https://www.amazon.de/gp/product/*",
    "https://www.amazon.de/*/dp/*",
    "https://www.amazon.de/*/dp/product-description/*",
    "https://www.amazon.de/dp/*",
    "https://www.amazon.de/*/dp/*",

    "http://www.amazon.ca/exec/obidos/ASIN/*",
    "http://www.amazon.ca/exec/obidos/tg/detail/-/*/*",
    "http://www.amazon.ca/exec/obidos/tg/detail/-/*",
    "http://www.amazon.ca/exec/obidos/*",
    "http://www.amazon.ca/o/tg/detail/-/*/*",
    "http://www.amazon.ca/o/tg/detail/-/*",
    "http://www.amazon.ca/o/ASIN/*",
    "http://www.amazon.ca/o/*",
    "http://www.amazon.ca/gp/product/product-description/*",
    "http://www.amazon.ca/gp/product/*",
    "http://www.amazon.ca/*/dp/*",
    "http://www.amazon.ca/*/dp/product-description/*",
    "http://www.amazon.ca/dp/*",
    "http://www.amazon.ca/*/dp/*",
    "https://www.amazon.ca/exec/obidos/ASIN/*",
    "https://www.amazon.ca/exec/obidos/tg/detail/-/*/*",
    "https://www.amazon.ca/exec/obidos/tg/detail/-/*",
    "https://www.amazon.ca/exec/obidos/*",
    "https://www.amazon.ca/o/tg/detail/-/*/*",
    "https://www.amazon.ca/o/tg/detail/-/*",
    "https://www.amazon.ca/o/ASIN/*",
    "https://www.amazon.ca/o/*",
    "https://www.amazon.ca/gp/product/product-description/*",
    "https://www.amazon.ca/gp/product/*",
    "https://www.amazon.ca/*/dp/*",
    "https://www.amazon.ca/*/dp/product-description/*",
    "https://www.amazon.ca/dp/*",
    "https://www.amazon.ca/*/dp/*",

    "http://www.amazon.cn/exec/obidos/ASIN/*",
    "http://www.amazon.cn/exec/obidos/tg/detail/-/*/*",
    "http://www.amazon.cn/exec/obidos/tg/detail/-/*",
    "http://www.amazon.cn/exec/obidos/*",
    "http://www.amazon.cn/o/tg/detail/-/*/*",
    "http://www.amazon.cn/o/tg/detail/-/*",
    "http://www.amazon.cn/o/ASIN/*",
    "http://www.amazon.cn/o/*",
    "http://www.amazon.cn/gp/product/product-description/*",
    "http://www.amazon.cn/gp/product/*",
    "http://www.amazon.cn/*/dp/*",
    "http://www.amazon.cn/*/dp/product-description/*",
    "http://www.amazon.cn/dp/*",
    "http://www.amazon.cn/*/dp/*",
    "https://www.amazon.cn/exec/obidos/ASIN/*",
    "https://www.amazon.cn/exec/obidos/tg/detail/-/*/*",
    "https://www.amazon.cn/exec/obidos/tg/detail/-/*",
    "https://www.amazon.cn/exec/obidos/*",
    "https://www.amazon.cn/o/tg/detail/-/*/*",
    "https://www.amazon.cn/o/tg/detail/-/*",
    "https://www.amazon.cn/o/ASIN/*",
    "https://www.amazon.cn/o/*",
    "https://www.amazon.cn/gp/product/product-description/*",
    "https://www.amazon.cn/gp/product/*",
    "https://www.amazon.cn/*/dp/*",
    "https://www.amazon.cn/*/dp/product-description/*",
    "https://www.amazon.cn/dp/*",
    "https://www.amazon.cn/*/dp/*",

    "http://www.amazon.it/exec/obidos/ASIN/*",
    "http://www.amazon.it/exec/obidos/tg/detail/-/*/*",
    "http://www.amazon.it/exec/obidos/tg/detail/-/*",
    "http://www.amazon.it/exec/obidos/*",
    "http://www.amazon.it/o/tg/detail/-/*/*",
    "http://www.amazon.it/o/tg/detail/-/*",
    "http://www.amazon.it/o/ASIN/*",
    "http://www.amazon.it/o/*",
    "http://www.amazon.it/gp/product/product-description/*",
    "http://www.amazon.it/gp/product/*",
    "http://www.amazon.it/*/dp/*",
    "http://www.amazon.it/*/dp/product-description/*",
    "http://www.amazon.it/dp/*",
    "http://www.amazon.it/*/dp/*",
    "https://www.amazon.it/exec/obidos/ASIN/*",
    "https://www.amazon.it/exec/obidos/tg/detail/-/*/*",
    "https://www.amazon.it/exec/obidos/tg/detail/-/*",
    "https://www.amazon.it/exec/obidos/*",
    "https://www.amazon.it/o/tg/detail/-/*/*",
    "https://www.amazon.it/o/tg/detail/-/*",
    "https://www.amazon.it/o/ASIN/*",
    "https://www.amazon.it/o/*",
    "https://www.amazon.it/gp/product/product-description/*",
    "https://www.amazon.it/gp/product/*",
    "https://www.amazon.it/*/dp/*",
    "https://www.amazon.it/*/dp/product-description/*",
    "https://www.amazon.it/dp/*",
    "https://www.amazon.it/*/dp/*",

    "http://www.amazon.es/exec/obidos/ASIN/*",
    "http://www.amazon.es/exec/obidos/tg/detail/-/*/*",
    "http://www.amazon.es/exec/obidos/tg/detail/-/*",
    "http://www.amazon.es/exec/obidos/*",
    "http://www.amazon.es/o/tg/detail/-/*/*",
    "http://www.amazon.es/o/tg/detail/-/*",
    "http://www.amazon.es/o/ASIN/*",
    "http://www.amazon.es/o/*",
    "http://www.amazon.es/gp/product/product-description/*",
    "http://www.amazon.es/gp/product/*",
    "http://www.amazon.es/*/dp/*",
    "http://www.amazon.es/*/dp/product-description/*",
    "http://www.amazon.es/dp/*",
    "http://www.amazon.es/*/dp/*",
    "https://www.amazon.es/exec/obidos/ASIN/*",
    "https://www.amazon.es/exec/obidos/tg/detail/-/*/*",
    "https://www.amazon.es/exec/obidos/tg/detail/-/*",
    "https://www.amazon.es/exec/obidos/*",
    "https://www.amazon.es/o/tg/detail/-/*/*",
    "https://www.amazon.es/o/tg/detail/-/*",
    "https://www.amazon.es/o/ASIN/*",
    "https://www.amazon.es/o/*",
    "https://www.amazon.es/gp/product/product-description/*",
    "https://www.amazon.es/gp/product/*",
    "https://www.amazon.es/*/dp/*",
    "https://www.amazon.es/*/dp/product-description/*",
    "https://www.amazon.es/dp/*",
    "https://www.amazon.es/*/dp/*",

    "http://www.amazon.com.br/exec/obidos/ASIN/*",
    "http://www.amazon.com.br/exec/obidos/tg/detail/-/*/*",
    "http://www.amazon.com.br/exec/obidos/tg/detail/-/*",
    "http://www.amazon.com.br/exec/obidos/*",
    "http://www.amazon.com.br/o/tg/detail/-/*/*",
    "http://www.amazon.com.br/o/tg/detail/-/*",
    "http://www.amazon.com.br/o/ASIN/*",
    "http://www.amazon.com.br/o/*",
    "http://www.amazon.com.br/gp/product/product-dcom.brcription/*",
    "http://www.amazon.com.br/gp/product/*",
    "http://www.amazon.com.br/*/dp/*",
    "http://www.amazon.com.br/*/dp/product-dcom.brcription/*",
    "http://www.amazon.com.br/dp/*",
    "http://www.amazon.com.br/*/dp/*",
    "https://www.amazon.com.br/exec/obidos/ASIN/*",
    "https://www.amazon.com.br/exec/obidos/tg/detail/-/*/*",
    "https://www.amazon.com.br/exec/obidos/tg/detail/-/*",
    "https://www.amazon.com.br/exec/obidos/*",
    "https://www.amazon.com.br/o/tg/detail/-/*/*",
    "https://www.amazon.com.br/o/tg/detail/-/*",
    "https://www.amazon.com.br/o/ASIN/*",
    "https://www.amazon.com.br/o/*",
    "https://www.amazon.com.br/gp/product/product-dcom.brcription/*",
    "https://www.amazon.com.br/gp/product/*",
    "https://www.amazon.com.br/*/dp/*",
    "https://www.amazon.com.br/*/dp/product-dcom.brcription/*",
    "https://www.amazon.com.br/dp/*",
    "https://www.amazon.com.br/*/dp/*",

    "http://www.amazon.in/exec/obidos/ASIN/*",
    "http://www.amazon.in/exec/obidos/tg/detail/-/*/*",
    "http://www.amazon.in/exec/obidos/tg/detail/-/*",
    "http://www.amazon.in/exec/obidos/*",
    "http://www.amazon.in/o/tg/detail/-/*/*",
    "http://www.amazon.in/o/tg/detail/-/*",
    "http://www.amazon.in/o/ASIN/*",
    "http://www.amazon.in/o/*",
    "http://www.amazon.in/gp/product/product-dincription/*",
    "http://www.amazon.in/gp/product/*",
    "http://www.amazon.in/*/dp/*",
    "http://www.amazon.in/*/dp/product-dincription/*",
    "http://www.amazon.in/dp/*",
    "http://www.amazon.in/*/dp/*",
    "https://www.amazon.in/exec/obidos/ASIN/*",
    "https://www.amazon.in/exec/obidos/tg/detail/-/*/*",
    "https://www.amazon.in/exec/obidos/tg/detail/-/*",
    "https://www.amazon.in/exec/obidos/*",
    "https://www.amazon.in/o/tg/detail/-/*/*",
    "https://www.amazon.in/o/tg/detail/-/*",
    "https://www.amazon.in/o/ASIN/*",
    "https://www.amazon.in/o/*",
    "https://www.amazon.in/gp/product/product-dincription/*",
    "https://www.amazon.in/gp/product/*",
    "https://www.amazon.in/*/dp/*",
    "https://www.amazon.in/*/dp/product-dincription/*",
    "https://www.amazon.in/dp/*",
    "https://www.amazon.in/*/dp/*",

    "http://www.amazon.com.mx/exec/obidos/ASIN/*",
    "http://www.amazon.com.mx/exec/obidos/tg/detail/-/*/*",
    "http://www.amazon.com.mx/exec/obidos/tg/detail/-/*",
    "http://www.amazon.com.mx/exec/obidos/*",
    "http://www.amazon.com.mx/o/tg/detail/-/*/*",
    "http://www.amazon.com.mx/o/tg/detail/-/*",
    "http://www.amazon.com.mx/o/ASIN/*",
    "http://www.amazon.com.mx/o/*",
    "http://www.amazon.com.mx/gp/product/product-dcom.mxcription/*",
    "http://www.amazon.com.mx/gp/product/*",
    "http://www.amazon.com.mx/*/dp/*",
    "http://www.amazon.com.mx/*/dp/product-dcom.mxcription/*",
    "http://www.amazon.com.mx/dp/*",
    "http://www.amazon.com.mx/*/dp/*",
    "https://www.amazon.com.mx/exec/obidos/ASIN/*",
    "https://www.amazon.com.mx/exec/obidos/tg/detail/-/*/*",
    "https://www.amazon.com.mx/exec/obidos/tg/detail/-/*",
    "https://www.amazon.com.mx/exec/obidos/*",
    "https://www.amazon.com.mx/o/tg/detail/-/*/*",
    "https://www.amazon.com.mx/o/tg/detail/-/*",
    "https://www.amazon.com.mx/o/ASIN/*",
    "https://www.amazon.com.mx/o/*",
    "https://www.amazon.com.mx/gp/product/product-dcom.mxcription/*",
    "https://www.amazon.com.mx/gp/product/*",
    "https://www.amazon.com.mx/*/dp/*",
    "https://www.amazon.com.mx/*/dp/product-dcom.mxcription/*",
    "https://www.amazon.com.mx/dp/*",
    "https://www.amazon.com.mx/*/dp/*",

    "http://www.amazon.au/exec/obidos/ASIN/*",
    "http://www.amazon.au/exec/obidos/tg/detail/-/*/*",
    "http://www.amazon.au/exec/obidos/tg/detail/-/*",
    "http://www.amazon.au/exec/obidos/*",
    "http://www.amazon.au/o/tg/detail/-/*/*",
    "http://www.amazon.au/o/tg/detail/-/*",
    "http://www.amazon.au/o/ASIN/*",
    "http://www.amazon.au/o/*",
    "http://www.amazon.au/gp/product/product-daucription/*",
    "http://www.amazon.au/gp/product/*",
    "http://www.amazon.au/*/dp/*",
    "http://www.amazon.au/*/dp/product-daucription/*",
    "http://www.amazon.au/dp/*",
    "http://www.amazon.au/*/dp/*",
    "https://www.amazon.au/exec/obidos/ASIN/*",
    "https://www.amazon.au/exec/obidos/tg/detail/-/*/*",
    "https://www.amazon.au/exec/obidos/tg/detail/-/*",
    "https://www.amazon.au/exec/obidos/*",
    "https://www.amazon.au/o/tg/detail/-/*/*",
    "https://www.amazon.au/o/tg/detail/-/*",
    "https://www.amazon.au/o/ASIN/*",
    "https://www.amazon.au/o/*",
    "https://www.amazon.au/gp/product/product-daucription/*",
    "https://www.amazon.au/gp/product/*",
    "https://www.amazon.au/*/dp/*",
    "https://www.amazon.au/*/dp/product-daucription/*",
    "https://www.amazon.au/dp/*",
    "https://www.amazon.au/*/dp/*",

    "http://www.amazon.nl/exec/obidos/ASIN/*",
    "http://www.amazon.nl/exec/obidos/tg/detail/-/*/*",
    "http://www.amazon.nl/exec/obidos/tg/detail/-/*",
    "http://www.amazon.nl/exec/obidos/*",
    "http://www.amazon.nl/o/tg/detail/-/*/*",
    "http://www.amazon.nl/o/tg/detail/-/*",
    "http://www.amazon.nl/o/ASIN/*",
    "http://www.amazon.nl/o/*",
    "http://www.amazon.nl/gp/product/product-dnlcription/*",
    "http://www.amazon.nl/gp/product/*",
    "http://www.amazon.nl/*/dp/*",
    "http://www.amazon.nl/*/dp/product-dnlcription/*",
    "http://www.amazon.nl/dp/*",
    "http://www.amazon.nl/*/dp/*",
    "https://www.amazon.nl/exec/obidos/ASIN/*",
    "https://www.amazon.nl/exec/obidos/tg/detail/-/*/*",
    "https://www.amazon.nl/exec/obidos/tg/detail/-/*",
    "https://www.amazon.nl/exec/obidos/*",
    "https://www.amazon.nl/o/tg/detail/-/*/*",
    "https://www.amazon.nl/o/tg/detail/-/*",
    "https://www.amazon.nl/o/ASIN/*",
    "https://www.amazon.nl/o/*",
    "https://www.amazon.nl/gp/product/product-dnlcription/*",
    "https://www.amazon.nl/gp/product/*",
    "https://www.amazon.nl/*/dp/*",
    "https://www.amazon.nl/*/dp/product-dnlcription/*",
    "https://www.amazon.nl/dp/*",
    "https://www.amazon.nl/*/dp/*"
];
