Number.prototype.toRad = function() {
  const halfTurn = 180

  return this * Math.PI / halfTurn
}

const haversine = (coord1, coord2) => {
  // Radius of the Earth in km
  const R = 6371
  // delta latitude in radian
  const dLat = (coord1.latitude - coord2.latitude).toRad()
  // delta longitude in radian
  const dLon = (coord1.longitude - coord2.longitude).toRad()
  // to the power of two
  const pow2 = (num) => Math.pow(num, 2)

  const a
    = pow2(Math.sin(dLat / 2))
      + Math.cos(coord1.latitude.toRad())
      * Math.cos(coord2.latitude.toRad())
      * pow2(Math.sin(dLon / 2))
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const resultInMeters = R * c * 1000

  // return value in meters rounded to 1m
  return resultInMeters.toFixed(0)
}

export default haversine
