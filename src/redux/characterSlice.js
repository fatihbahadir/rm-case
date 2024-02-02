import { createSlice } from '@reduxjs/toolkit';

const getFavoritesFromLocalStorage = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    favorites: getFavoritesFromLocalStorage(),
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const characterId = action.payload;
      const index = state.favorites.indexOf(characterId);

      if (index === -1 && state.favorites.length < 10) {
        state.favorites.push(characterId);
      } else if (index !== -1) {
        state.favorites.splice(index, 1);
      }

      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const { toggleFavorite } = charactersSlice.actions;

export const selectFavorites = (state) => state.characters.favorites;

export default charactersSlice.reducer;
