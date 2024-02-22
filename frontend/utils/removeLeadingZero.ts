export function removeLeadingZero(number: number | string) {
  let numberStr = number.toString()
  console.log(number)
  console.log(numberStr)

  if (numberStr.startsWith("0") && numberStr.length > 1) {
    return parseInt(numberStr.substring(1))
  } else {
    return number
  }
}
