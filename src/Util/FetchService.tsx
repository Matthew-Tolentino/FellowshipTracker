import { filterDataCsv } from "./Utility";

export const fetchMembersCSV = async (setMembers: any, url: string) => {
  fetch(url)
    .then(async (res) => {
      let data = await res.text()

      let members = filterDataCsv(data);

      // console.log(members);

      setMembers(members);
    })
    .catch((err) => {
      console.log(`${err.status} - ${err.message}`)
    });
}