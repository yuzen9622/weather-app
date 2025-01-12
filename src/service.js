export const api_url = "https://opendata.cwa.gov.tw/api/v1/rest/datastore";

export function getMoment(date) {
  if (!date) {
    let hours = new Date().getHours();
    return hours >= 6 && hours < 18 ? "day" : "night";
  }
  const time = new Date(date).getHours();

  if (time >= 6 && time < 18) {
    return "day";
  } else {
    return "night";
  }
}

export function getDateToISO() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从 0 开始，需要加 1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours() - 1).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}
export function formatDate(date) {
  if (!date || date === "") return "";
  date = new Date(date);

  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  );
}
