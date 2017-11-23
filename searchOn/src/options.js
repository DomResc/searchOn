document.addEventListener('DOMContentLoaded', function () {

    browser.storage.local.get(null, function (result) {

        if (result.searchName && result.queryUrl) {
            document.getElementById('searchName').value = result.searchName
            document.getElementById('queryUrl').value = result.queryUrl
        }

        document.getElementById('saveButton').addEventListener('click', function () {

            const name = this.form.searchName.value
            const url = this.form.queryUrl.value

            if (name.length > 0 && url.length > 0) {
                browser.storage.local.set({
                    searchName: name,
                    queryUrl: url
                })

                browser.storage.local.get(null, function (result) {
                    name = result.searchName
                    browser.contextMenus.update('context_menus_search', {
                        title: `Search "%s" on ${name}`,
                    })
                })
            }
        })
    })
})
