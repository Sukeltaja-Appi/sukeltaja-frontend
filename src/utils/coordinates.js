// Convert coordinates from decimal degrees to degrees, minutes and seconds.
const decimalToDMS = (coordinate) => {
  const mul = 60
  const precision = 4

  const degrees = (coordinate) => Math.floor(coordinate)
  const minutes = (coordinate) => Math.floor((coordinate - degrees(coordinate)) * mul)
  const seconds = (coordinate) => ((coordinate - degrees(coordinate)) * mul - minutes(coordinate)) * mul

  const formatted = `${degrees(coordinate)}° ${minutes(coordinate)}' ${seconds(coordinate).toFixed(precision)}"`

  return formatted
}

export default decimalToDMS
