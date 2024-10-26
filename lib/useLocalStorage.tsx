export const saveStorage = (newData: unknown, name: string) => {
  const localStorageData = localStorage.getItem(name)
  let data: unknown[]
  data = localStorageData === null ? [] : JSON.parse(localStorageData)
  if (Array.isArray(data)) {
    data.push(newData)
  } else {
    data = [newData]
  }
  localStorage.setItem(name, JSON.stringify(data))
}
export const saveStorageSingle = (newData:unknown, name:string) => {
  localStorage.setItem(name, JSON.stringify(newData))
}
export const fetchStorage = (key: string) => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

export const deleteStorage = (key: string) => {
  return localStorage.removeItem(key)
}
export const deleteStorageId = (id: number, key: string) => {
  const item = localStorage.getItem(key)
  if (item) {
    const data = JSON.parse(item)
    const newData = data.filter((item: { id: number }) => item.id !== id)
    localStorage.setItem(key, JSON.stringify(newData))
  }
  
}