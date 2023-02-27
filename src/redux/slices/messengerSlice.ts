import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        selectedUserId: null,
        isGroupConversation: false,
}

const messengerSlice = createSlice({
    name: 'messenger',
    initialState,
    reducers: {
        onConversationSelect: (state, {payload}) => {
            state.selectedUserId = payload._id
        }
    },
    extraReducers: {}
})

export const { onConversationSelect } = messengerSlice.actions

export default messengerSlice.reducer