var loadedTabs = new Set()
var initialized = false

browser.tabs.onActivated.addListener(loadTab => {
  let current = false
  let count = 0

  if(!initialized){
    browser.tabs.onCreated.addListener(t => {
      loadedTabs.add(t.id)
    })
    initialized = true
  }

  loadedTabs.add(loadTab.tabId)

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

browser.tabs.onRemoved.addListener(t => {
  loadedTabs.delete(t)
})
