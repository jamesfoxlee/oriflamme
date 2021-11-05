import React from 'react';

// value passed in to createContext() is default value
// don't sweat this, we will give it meaningful data later
export const CardsContext = React.createContext();
export const CardsProvider = CardsContext.Provider;
