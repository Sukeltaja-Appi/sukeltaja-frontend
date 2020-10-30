import { DateTime, Duration, Settings } from 'luxon'

Settings.defaultLocale = 'fi'

// Format given date, either a string or Date() object.
export const formatDate = (date) => {
  const format = (dateTime) => {
    return dateTime
      .toLocaleString({
        weekday: 'short',
        ...DateTime.DATETIME_SHORT
      })
  }

  if (typeof date === 'string') {
    return format(DateTime.fromISO(date))
  }

  return format(DateTime.fromJSDate(date))
}

// Format given duration.
export const formatDuration = (duration) => {
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

// Return current time with the precision of minutes.
export const now = () => {
  const { year, month, day, hour, minute } = DateTime.local()

  return DateTime
    .local(year, month, day, hour, minute)
    .toJSDate()
}

// Return current time plus one hour with the precision of minutes.
export const inOneHour = () => {
  const { year, month, day, hour, minute } = DateTime.local()

  return DateTime
    .local(year, month, day, hour, minute)
    .plus({ hours: 1 })
    .toJSDate()
}

export const inTenMinutes = () => {
  const { year, month, day, hour, minute } = DateTime.local()

  return DateTime
    .local(year, month, day, hour, minute)
    .plus({ minutes: 10 })
    .toJSDate()
}

export const dateToday1200 = () => {
  const { year, month, day } = DateTime.local()
  const midday = 12

  return DateTime.local(year, month, day, midday)
    .toJSDate()
}

export const dateTomorrow = () => {
  const { year, month, day } = DateTime.local()

  return DateTime.local(year, month, day)
    .plus({ days: 1 })
    .toJSDate()
}

export const thisWeeksSunday = () => {
  const { year, month, day } = DateTime.local()
  const weekDayIndexesInLuxon = 6

  return DateTime.local(year, month, day)
    .plus({ days: weekDayIndexesInLuxon - DateTime.local().weekday })
    .toJSDate()
}

export const nextWeeksSunday = () => {
  const { year, month, day } = DateTime.local()
  const weekDayIndexesInLuxonPlusWeek = 13

  return DateTime.local(year, month, day)
    .plus({ days: weekDayIndexesInLuxonPlusWeek - DateTime.local().weekday })
    .toJSDate()
}

export const dateInOneMonth = () => {
  const { year, month, day } = DateTime.local()

  return DateTime.local(year, month, day)
    .plus({ months: 1 })
    .toJSDate()
}