export const format = (duration) => {
  const seconds = duration.milliseconds / 1000

  const times = {
    minute: 60,
    get hour() { return this.minute * 60 },
    get day() { return this.hour * 24 }
  }

  const { day, hour, minute } = times

  const format = ["d'd'", "h'h'", "m'm'", "s's'"]

  if (seconds >= day) {
    return duration.toFormat(format.join(' '))
  } else if (seconds >= hour) {
    return duration.toFormat(format.slice(1).join(' '))
  } else if (seconds >= minute) {
    return duration.toFormat(format.slice(2).join(' '))
  }

  // return seconds
  return duration.toFormat(format.slice(3).join(' '))
}
