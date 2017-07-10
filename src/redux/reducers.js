import { combineReducers } from 'redux';

export function itemsHasErrored(state = false, action) {
  switch (action.type) {
    case 'ITEMS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function itemsIsLoading(state = false, action) {
  switch (action.type) {
    case 'ITEMS_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function items(state = [], action) {
  switch (action.type) {
    case 'ITEMS_FETCH_DATA_SUCCESS':
      return action.items;

    default:
      return state;
  }
}

export function selectNote(state = {}, action) {
  switch (action.type) {
    case 'SELECT_NOTE':
      return action.note;
    case 'NEW_NOTE_VIEW':
      return action.note;
    default:
      return state;
  }
}
export default combineReducers({
  items,
  itemsHasErrored,
  itemsIsLoading,
  selectNote,
});
