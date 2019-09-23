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
