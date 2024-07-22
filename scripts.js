/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"M7gaYztCgL6iiZGh","label":"news","bookmarks":[{"id":"oT3bQNM6tzgAYaGP","label":"il manifesto","url":"https://ilmanifesto.it/"},{"id":"6IaIe3CrtcJVD4Bc","label":"La Repubblica","url":"https://www.repubblica.it/"},{"id":"yDzT7rkIe13pb7W9","label":"The Guardian","url":"https://www.theguardian.com/europe"}]},{"id":"PlMn0A3omZNAZkZx","label":"science","bookmarks":[{"id":"SBbPKttj7fa6liis","label":"Nature Astronomy","url":"https://www-nature-com.pros1.lib.unimi.it/natastron/"},{"id":"eGX3JDLTcwavP6Fy","label":"Scientific American","url":"https://www.scientificamerican.com/"},{"id":"CSkCn9fCyy6pFnCy","label":"Quanta Magazine","url":"https://www.quantamagazine.org/"}]},{"id":"yYADLghr3viEwpaG","label":"sources","bookmarks":[{"id":"72JEJEViAgKkLZnC","label":"arXiv","url":"https://arxiv.org/"},{"id":"2abiPCbjWJKKWZnE","label":"PDG","url":"https://pdg.lbl.gov/"},{"id":"DlFzKDpRIIXOLnrA","label":"StackOverflow","url":"https://stackoverflow.com/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
