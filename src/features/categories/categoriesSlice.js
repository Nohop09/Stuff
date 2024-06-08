import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../../utils/constants"
// получаем категории из базы
export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async(_,thunkAPI)=>{
        try {
            const res = await axios(`${BASE_URL}/categories`)
           return res.data
        } catch(err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err)

}})
// при успешном получении категорий передаем в лист их
const categoriesSlice = createSlice(
    {
        name:'categories',
        initialState : {
             list: [],
             isLoading: false,
           },
           extraReducers:(builder)=> {
              builder.addCase(getCategories.pending,(state)=> {
                state.isLoading = true;
            })
            builder.addCase(getCategories.fulfilled,(state,{payload})=> {
                state.list = payload;
                state.isLoading = false;
            })
               builder.addCase(getCategories.rejected,(state)=> {
                 state.isLoading = false;
            })
           }
    }
)
export default categoriesSlice.reducer