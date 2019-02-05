export const format = (duration) => {
  const { milliseconds } = duration

  const times = {
    second: 1000,
    get minute() { return this.second * 60 },
    get hour() { return this.minute * 60 },
    get day() { return this.hour * 24 }
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
