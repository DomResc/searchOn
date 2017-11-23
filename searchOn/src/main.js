function init() {
    browser.storage.local.get(null, function (result) {
        let name = ''
        let url = ''

        if (result.searchName.length) {
            name = result.searchName
        } else {
            name = 'Google'
        }

        browser.contextMenus.create({
            id: 'context_menus_search',
            title: `Search "%s" on ${name}`,
            contexts: ["selection"],
            onclick: function (info, tab) {
                browser.storage.local.get(null, function (result) {

                    if (result.queryUrl.length) {
                        url = result.queryUrl
                    } else {
                        url = 'https://www.google.com/search?q='
                    }

                    browser.tabs.create({
                        url: url + info.selectionText
                    })

                })
            }
        })
    })
}

init()