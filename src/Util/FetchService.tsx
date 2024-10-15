import { filterFellowshipCsv } from "./Utility";

export const fetchFellowshipCsv = async (setFellowship: any, url: string) => {
  fetch(url)
    .then(async (res) => {
      let data = await res.text();

      let fellowship = filterFellowshipCsv(data);

      setFellowship(fellowship);
    });
}