import { Character, Member } from "./Fellowship";

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

function filterDataCsv(data: string) {
  let members: Member[] = [];
  let lines = data.split('\n')
      
  lines.forEach((line: string) => {
    let m = line.split(',').filter(x => x.length > 0);

    if (isCharacter(m[0])) {
      let distances = m.splice(2, m.length).map(s => Number(s));
      let member = {
        name: m[1],
        character: m[0] as Character,
        distances: distances,
        totalDistance: 15
      } as Member;

      members.push(member);
    }
  });

  return members;
}

function isCharacter(value: string) {
  return Object.values(Character).includes(value as Character);
}