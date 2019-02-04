export const format = (duration) => {
  const { milliseconds } = duration

  const times = {
    minute: 60000,
    hour: 3600000,
    day: 86400000
  }

  const { day, hour, minute } = times

  const format = ["d'd'", "h'h'", "m'm'", "s's'"]

  if (milliseconds >= day) {
    return duration.toFormat(format.join(' '))
  } else if (duration.milliseconds >= hour) {
    return duration.toFormat(format.slice(1).join(' '))
  } else if (duration.milliseconds >= minute) {
    return duration.toFormat(format.slice(2).join(' '))
  }

  // return seconds
  return duration.toFormat(format.slice(3).join(' '))
}
