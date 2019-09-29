export const range = (size, startAt = 0) => {
  const arr = []
  for (let i = 0; i < size; i++) {
    arr[i] = startAt + i
  }
  return arr
}

// 不满10补0
export const repairZero = num => {
  return num < 10 ? `0${num}` : num
}

/**
 *
 * @param {键}} key
 * @param {值} val  如果没val 就是获取
 */
export const handleLocalStorage = (key, val) => {
  if (val || val === 0) {
    window.localStorage.setItem(key, val)
  } else {
    return window.localStorage.getItem(key)
  }
}
