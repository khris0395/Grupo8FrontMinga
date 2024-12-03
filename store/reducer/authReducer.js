import { createReducer } from "@reduxjs/toolkit";
import { login, setUser, logOut, registerUser } from "../actions/authActions";

const initialState = {  
    loading : false,
    error : false,
    user : null,
    successMessage: null,
    token : null
}

 const authReducer = createReducer(initialState,(builder) => {
    builder.addCase(login.fulfilled,(state,action)=>{
        
        state.loading = false,
        state.error = false,
        state.user = action.payload.user,
        state.token = action.payload.token
    })
    .addCase(login.pending,(state,action)=>{

        state.loading = true,
        state.error = false,
        state.user = null,
        state.token = null
    })
    .addCase(login.rejected,(state,action)=>{

        localStorage.removeItem("token");
        state.loading = false,
        state.error = action.error.message,
        state.user = null,
        state.token = null
    })

    .addCase(setUser,(state,action)=>{
        state.user = action.payload.user,
        state.token = action.payload.token
    })

    .addCase(logOut,(state,action)=>{
        localStorage.removeItem("token");
        state.user = null,
        state.token = null
    }) 
    
    .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null; 
        state.successMessage = null;
      })
      
    .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.successMessage = 'Registration successful!';
      })
    
    .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });

})

export default authReducer;