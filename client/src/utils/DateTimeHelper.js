export function formatRelativeDate(date) {
  const now = new Date();

  if (isSameDate(now, date)) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    return formattedTime;
  } else if (isYesterday(now, date)) {
    return "Yesterday";
  } else if (isWithinAWeek(now, date)) {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekday[date.getDay()];
  } else {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  }
}

// Helper function to check if two dates are the same (ignoring time)
function isSameDate(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

// Helper function to check if a date is yesterday compared to another date
function isYesterday(date1, date2) {
  const yesterday = new Date(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate() - 1
  );
  return isSameDate(yesterday, date2);
}

// Helper function to check if a date is within the last week compared to another date
function isWithinAWeek(date1, date2) {
  const oneWeekAgo = new Date(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate() - 7
  );
  return date2 >= oneWeekAgo;
}
