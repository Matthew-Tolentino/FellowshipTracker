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
import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

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
      return Legolas; //https://i.imgur.com/7WAyEyq.jpeg
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
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className={`members-section p-background ${open ? 'open' : ''}`}>
        <div className="members-header">
          <span>Fellowship of the Ring</span>
        </div>
        {
          members.map((member: Member, index: number) => {
            return (
              <div className='member'>
                <img src={member.portrat ? member.portrat : GetPortrait(member.character)}/>
                <div className='member-cell-2'>
                  <span>{member.character}</span>
                  <span>{member.name}</span>
                </div>
                <div className='member-cell-3'>
                  <span>{member.totalDistance.toFixed(2)} mi</span>
                </div>
              </div>
            )
          })
        }
      </div>
      <button className={`members-toggle ${open ? 'open' : ''}`} onClick={toggleOpen}>
        { open ? <IoIosArrowBack /> : <IoIosArrowForward /> }
      </button>
    </>
  )
}

export default Members;