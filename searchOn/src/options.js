document.addEventListener('DOMContentLoaded', function () {
    browser.storage.local.get(null, function (result) {

        if (result.searchName.length && result.queryUrl.length) {
            document.getElementById('searchName').value = result.searchName
            document.getElementById('queryUrl').value = result.queryUrl
        }

        document.getElementById('saveButton').addEventListener('click', addProvider)
    })
})

function addProvider() {
    const name = this.form.searchName.value
    const url = this.form.queryUrl.value

    if (name.length && url.length) {

        browser.storage.local.set({
            searchName: name,
            queryUrl: url
        })

        changeProvider()
    }
}

function changeProvider() {
    browser.storage.local.get(null, function (result) {
        name = result.searchName

        browser.contextMenus.update('context_menus_search', {
            title: `Search "%s" on ${name}`,
        })
    })
}