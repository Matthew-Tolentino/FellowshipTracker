import { Member } from '../../Models/Member';
import './Members.scss';

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
            <div>
              foobar
            </div>
          )
        })
      }
    </div>
  )
}

export default Members;