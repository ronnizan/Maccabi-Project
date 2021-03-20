import React, { useEffect, useState } from 'react';
import './UserTable.css';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';
import {
  getUsersAction,
  getTotalNumberOfUsersAction,
} from '../../redux/actions/userActions';

const UsersTable = () => {
  const dispatch = useDispatch();
  const { loading: getUsersLoading, users } = useSelector(
    (state) => state.getUsers
  );
  const { loading: getTotalUserLoading, totalNumberOfUsers } = useSelector(
    (state) => state.getTotalUsers
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('creation date');
  const sorOptions = ['creation date', 'username', 'email', 'age'];

  useEffect(() => {
    dispatch(getUsersAction());
    dispatch(getTotalNumberOfUsersAction());
  }, []);

  // display page buttons
  const showPageNumbers = () => {
    let array = [];
    for (let index = 1; index <= Math.ceil(totalNumberOfUsers / 5); index++) {
      array.push(index);
    }
    return array.map((number) => (
      <button
        className={
          currentPage === number
            ? 'Table__PageNumberBtn ActivePage'
            : 'Table__PageNumberBtn'
        }
        onClick={() => {
          //a small adaption to the request before sending it to the server.
          if (sortBy === 'creation date') {
            dispatch(getUsersAction('creationDate', +number));
            setCurrentPage(number);
          } else {
            dispatch(getUsersAction(sortBy, +number));
            setCurrentPage(number);
          }
        }}
        key={number}
      >
        {number}
      </button>
    ));
  };

  const getUsersSorted = (sortOptionSelected) => {
    if (sortOptionSelected === 'creation date') {
      dispatch(getUsersAction('creationDate', +currentPage));
    } else {
      dispatch(getUsersAction(sortOptionSelected, +currentPage));
    }
  };

  return (
    <div className='Table__Container'>
      {getUsersLoading | getTotalUserLoading ? <LoadingSpinner /> : null}
      {users && users.length === 0 && (
        <h1 className='Table_Title'>No users yet</h1>
      )}
      {users && users.length > 0 && (
        <>
          <h1 className='Table_Title'>Users</h1>
          <div className='Table_SortButtonWrapper'>
            {sorOptions.map((sortOption) => (
              <button
                key={sortOption}
                className={
                  sortBy === sortOption
                    ? 'Table_SortButton ActiveSort'
                    : 'Table_SortButton'
                }
                onClick={() => {
                  setSortBy(sortOption);
                  getUsersSorted(sortOption);
                }}
              >
                Sort by {sortOption}
              </button>
            ))}
          </div>
          <table className='Table'>
            <thead className='Table__Thead'>
              <tr>
                <th className='Table__HeaderCell'>Username</th>
                <th className='Table__HeaderCell'>Email</th>
                <th className='Table__HeaderCell'>Age</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.createdAt} className='Table__RowBody'>
                  <td className='Table__BodyCell'>{user.username}</td>
                  <td className='Table__BodyCell'>{user.email}</td>
                  <td className='Table__BodyCell'>{user.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='Table__PageNumberButtons_Wrapper'>
            {showPageNumbers()}
          </div>
        </>
      )}
    </div>
  );
};

export default UsersTable;
