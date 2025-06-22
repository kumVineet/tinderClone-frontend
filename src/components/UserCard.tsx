import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../features/feed/feedSlice';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  photo: string;
  age?: number;
  gender?: string;
  about?: string;
}

const UserCard = ({ user }: { user: User }) => {
  const { _id, firstName, lastName, photo, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status: string, userId: string) => {
    try {
      const res = await axios.post(
        BASE_URL + '/request/send/' + status + '/' + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={user.photo} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + ' ' + lastName}</h2>
        {age && gender && <p>{age + ', ' + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest('ignore', _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest('interested', _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
