import { Duration } from 'luxon'

export const format = (duration) => {
  const day = Duration.fromObject({ days: 1 })
  const hour = Duration.fromObject({ hours: 1 })
  const minute = Duration.fromObject({ minutes: 1 })

  const format = ["d'd'", "h'h'", "m'm'", "s's'"]

  if (duration >= day) {
    return duration.toFormat(format.join(' '))
  } else if (duration >= hour) {
    return duration.toFormat(format.slice(1).join(' '))
  } else if (duration >= minute) {
    return duration.toFormat(format.slice(2).join(' '))
  }

  // return seconds
  return duration.toFormat(format.slice(3).join(' '))
}
