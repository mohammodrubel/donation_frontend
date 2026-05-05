import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_LANG, SUPPORTED_LANGS, type Lang } from "@/lib/i18n/config";

interface LangState {
  lang: Lang;
}

const initialState: LangState = {
  lang: DEFAULT_LANG,
};

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<Lang>) => {
      if (SUPPORTED_LANGS.includes(action.payload)) {
        state.lang = action.payload;
      }
    },
  },
});

export const { setLang } = langSlice.actions;
export default langSlice.reducer;
