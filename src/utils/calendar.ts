import { DateTime } from "luxon";

export const fiveDays = (today: string) => {
    const now = DateTime.local();
    const todayDateTime = DateTime.fromFormat(today, 'dd/MM/yy');


    const objToday = { info: now, number: todayDateTime.day, day: todayDateTime.weekdayShort, time: "" };
    const objYesterday = { info: now.minus({days: 1}), number: todayDateTime.minus({ days: 1 }).day, day: todayDateTime.minus({ days: 1 }).weekdayShort, time: "" };
    const objBeforeYesterday = { info: now.minus({days: 2}), number: todayDateTime.minus({ days: 2 }).day, day: todayDateTime.minus({ days: 2 }).weekdayShort, time: "" };
    const objTomorrow = { info: now.plus({days: 1}), number: todayDateTime.plus({ days: 1 }).day, day: todayDateTime.plus({ days: 1 }).weekdayShort, time: "" };
    const objAfterTomorrow = { info: now.plus({days: 2}), number: todayDateTime.plus({ days: 2 }).day, day: todayDateTime.plus({ days: 2 }).weekdayShort, time: "" };
  
    const arr = [objBeforeYesterday, objYesterday, objToday, objTomorrow, objAfterTomorrow];
  
    return arr;
  };


export const injectTime = (now: DateTime, arr: Array<{ info: DateTime; number: number; day: string | null; time: string }> ) => {
  return arr.map((dayObj) => {
    const diffInDays = Math.round(now.diff(dayObj.info, 'days').days);

    if (diffInDays === 0) {
      dayObj.time = 'today';
    } else if (diffInDays >= 1) {
      dayObj.time = 'before';
    } else if (diffInDays <= -1) {
      dayObj.time = 'after';
    }

    return dayObj;
})}

export const getPreviousFiveDays = (arr: Array<{ info: DateTime; number: number; day: string | null; time: string }>) => {
    const previousFiveDays = arr.map((dayObj) => {
      const previousDay = dayObj.info.minus({ days: 5 });
  
      if (previousDay.weekdayShort !== null) {
        return {
          info: previousDay,
          number: previousDay.day,
          day: previousDay.weekdayShort.toLowerCase(),
          time: ""
        };
      } else {
        return {
          info: dayObj.info, 
          number: 0, 
          day: "N/A", 
          time: ""
        };
      }
    });
  
    return previousFiveDays;
  };

  export const getNextFiveDays = (arr: Array<{ info: DateTime; number: number; day: string | null; time: string }>) => {
    const nextFiveDays = arr.map((dayObj) => {
      const nextDay = dayObj.info.plus({ days: 5 });
  
      if (nextDay.weekdayShort !== null) {
        return {
          info: nextDay,
          number: nextDay.day,
          day: nextDay.weekdayShort.toLowerCase(),
          time: ""
        };
      } else {
        return {
          info: dayObj.info, 
          number: 0, 
          day: "N/A",
          time: ""
        };
      }
    });
  
    return nextFiveDays;
  };