import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const Languages = ["en", "ru", 'pl']

const initialState = {
    selectedLang: 'en'
}

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
      setLanguage: (state, action: PayloadAction<string>) => {
        state.selectedLang = action.payload
      },
    },
  })


export const { setLanguage } = languageSlice.actions