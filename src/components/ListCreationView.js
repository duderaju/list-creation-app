import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader';
import FailureView from './FailureView';
import { fetchLists } from '../api';
import ListContainer from './ListContainer';
import './ListCreationView.css';

const ListCreationView = ({ onCancel = () => {} }) => {
  const [lists, setLists] = useState([]);
  const [checkedLists, setCheckedLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [newList, setNewList] = useState(null);

  /** Fetches lists from the API and updates state */
  useEffect(() => {
    const getLists = async () => {
      try {
        setTimeout(async () => {
          const data = await fetchLists();
          setLists([
            { list_number: 1, items: data.lists.filter((item) => item.list_number === 1) },
            { list_number: 2, items: data.lists.filter((item) => item.list_number === 2) },
          ]);
          setLoading(false);
        }, 2000);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    getLists();
  }, []);

  /** Toggles the selection of lists */
  const handleCheck = (listNumber) => {
    setCheckedLists((prevCheckedLists) =>
      prevCheckedLists.includes(listNumber)
        ? prevCheckedLists.filter((list) => list !== listNumber)
        : [...prevCheckedLists, listNumber].slice(-2)
    );
  };

  /** Creates a new list if exactly 2 lists are selected */
  const handleCreateNewList = () => {
    if (checkedLists.length !== 2) {
      setErrorMessage('You should select exactly 2 lists to create a new list.');
      return;
    }
    setErrorMessage('');
    const newListNumber = Math.max(...lists.map((list) => list.list_number)) + 1;
    setNewList({ list_number: newListNumber, items: [] });
  };

  /** Moves an item from an existing list to the new list */
  const handleMoveToNewList = (item, fromList) => {
    setNewList((prevNewList) => ({
      ...prevNewList,
      items: [...prevNewList.items, item],
    }));
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.list_number === fromList
          ? { ...list, items: list.items.filter((i) => i.id !== item.id) }
          : list
      )
    );
  };

  /** Moves an item back to its original list based on direction */
  const handleMoveBack = (item, direction) => {
    if (!newList) return;
    const targetListNumber = direction === 'left' ? checkedLists[0] : checkedLists[1];
    setNewList((prevNewList) => ({
      ...prevNewList,
      items: prevNewList.items.filter((i) => i.id !== item.id),
    }));
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.list_number === targetListNumber
          ? { ...list, items: [...list.items, item] }
          : list
      )
    );
  };

  /** Updates the lists and resets state */
  const handleUpdate = () => {
    if (!newList || newList.items.length === 0) {
      setErrorMessage('The new list must have at least one item before updating.');
      return;
    }
    if (checkedLists.length !== 2) {
      setErrorMessage('Please select exactly 2 lists before updating.');
      return;
    }
    setLists([...lists, newList]);
    setNewList(null);
    setCheckedLists([]);
    setErrorMessage('');
  };

  /** Resets state and triggers cancel action */
  const handleCancelClick = () => {
    setNewList(null);
    setCheckedLists([]);
    setErrorMessage('');
    onCancel();
  };

  if (loading) return <Loader />;
  if (error) return <FailureView onRetry={() => window.location.reload()} />;

  return (
    <div className="list-creation-container">
      <button className="new-list-btn" onClick={handleCreateNewList}>Create a New List</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="lists-container">
        <div className="lists-wrapper">
          {checkedLists.length === 2 && newList ? (
            <>
              <ListContainer
                key={checkedLists[0]}
                title={`List ${checkedLists[0]}`}
                items={lists.find((list) => list.list_number === checkedLists[0])?.items || []}
                isChecked
                onCheck={() => handleCheck(checkedLists[0])}
                onMoveItem={(item) => handleMoveToNewList(item, checkedLists[0])}
                arrowDirection="right"
              />
              <ListContainer
                key={newList.list_number}
                title={`List ${newList.list_number}`}
                items={newList.items}
                isChecked
                onMoveItem={(item, direction) => handleMoveBack(item, direction)}
                arrowDirection="both"
              />
              <ListContainer
                key={checkedLists[1]}
                title={`List ${checkedLists[1]}`}
                items={lists.find((list) => list.list_number === checkedLists[1])?.items || []}
                isChecked
                onCheck={() => handleCheck(checkedLists[1])}
                onMoveItem={(item) => handleMoveToNewList(item, checkedLists[1])}
                arrowDirection="left"
              />
            </>
          ) : (
            lists.map((list) => (
              <ListContainer
                key={list.list_number}
                title={`List ${list.list_number}`}
                items={list.items}
                isChecked={checkedLists.includes(list.list_number)}
                onCheck={() => handleCheck(list.list_number)}
                onMoveItem={(item) => handleMoveToNewList(item, list.list_number)}
                arrowDirection="none"
              />
            ))
          )}
        </div>
      </div>
      <div className="buttons-container">
        <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
        <button className="update-button" onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

ListCreationView.propTypes = {
  onCancel: PropTypes.func,
};

export default ListCreationView;
