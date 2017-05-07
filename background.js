var loadedTabs = new Set()

browser.tabs.onActivated.addListener(loadTab => {
  let current = false
  let count = 0

  browser.tabs.query({}).then(tabs => {
    tabs.forEach(tab => {
      if (count >= 5) {
        return
      }
      if (current) {
        if(!loadedTabs.has(tab.id)){
          browser.tabs.reload(tab.id)
          loadedTabs.add(tab.id)
        }
        count += 1
      } else {
        current = tab.id === loadTab.tabId
      }
    })
  })
})

browser.tabs.onCreated.addListener(t => {
  loadedTabs.add(t.id)
})
browser.tabs.onRemoved.addListener(t => {
  loadedTabs.delete(t)
})
