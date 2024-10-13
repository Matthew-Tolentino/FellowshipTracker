import { Character } from '../../Models/Character';
import { Member } from '../../Models/Member';
import './Members.scss';
import Aragorn from '../../imgs/Aragorn.jpg';
import Boromir from '../../imgs/Boromir.jpg';
import Frodo from '../../imgs/Frodo.jpg';
import Gandalf from '../../imgs/Gandalf.jpg';
import Gimli from '../../imgs/Gimli.jpg';
import Legolas from '../../imgs/Legolas.jpg';
import Merry from '../../imgs/Merry.jpg';
import Pippin from '../../imgs/Pippin.jpg';
import Sam from '../../imgs/Sam.jpg';

function GetPortrait(character: Character) {
  switch (character) {
    case Character.Aragorn:
      return Aragorn;
    case Character.Boromir:
      return Boromir;
    case Character.Frodo:
      return Frodo;
    case Character.Gandalf:
      return Gandalf;
    case Character.Gimli:
      return Gimli;
    case Character.Legolas:
      return Legolas;
    case Character.Merry:
      return Merry;
    case Character.Pippin:
      return Pippin;
    case Character.Sam:
      return Sam;
  }
}

interface IMembers {
  members: Member[];
}

const Members: React.FC<IMembers> = ({members}) => {
  return (
    <div className="members-section open">
      <div className="members-header">
        <span>Fellowship</span>
        <button>click</button>
      </div>
      {
        members.map((member: Member, index: number) => {
          return (
            <div className='member'>
              <img src={GetPortrait(member.character)}/>
              <span>Character: {member.character}</span>
              <span>Name: {member.name}</span>
              <span>Total Distance: {member.totalDistance.toFixed(2)} mi</span>
            </div>
          )
        })
      }
    </div>
  )
}

export default Members;