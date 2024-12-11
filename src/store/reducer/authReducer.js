import { createReducer } from "@reduxjs/toolkit";
import { login, setUser, logOut, registerUser, loginWithGoogle, updateRole, findAuthor, findCompany } from "../actions/authActions";

const getSavedToken = () => {
   const token = localStorage.getItem("token");
   if (token) {
       return token;
   }
   return null;
};

const initialState = {  
   loading: false,
   error: false,
   user: null,
   successMessage: null,
   token: getSavedToken() // Inicializamos con el token del localStorage
}

const authReducer = createReducer(initialState,(builder) => {
   builder
   .addCase(login.fulfilled,(state,action)=>{
       localStorage.setItem("token", action.payload.token);
       state.loading = false;
       state.error = false;
       state.user = action.payload.user;
       state.token = action.payload.token;
   })
   .addCase(login.pending,(state,action)=>{
       state.loading = true;
       state.error = false;
       state.user = null;
       state.token = null;
   })
   .addCase(login.rejected,(state,action)=>{
       localStorage.removeItem("token");
       state.loading = false;
       state.error = action.error.message;
       state.user = null;
       state.token = null;
   })
   .addCase(setUser,(state,action)=>{
       const token = getSavedToken();
       state.user = action.payload.user;
       state.token = token || action.payload.token;
       if (action.payload.token) {
           localStorage.setItem("token", action.payload.token);
       }
   })
   .addCase(logOut.pending,(state,action)=>{
       state.loading = true;
       state.error = null;
       state.successMessage = null;
   }) 
   .addCase(logOut.fulfilled, (state, action) => {
       localStorage.removeItem("token");
       state.loading = false;
       state.user = null;
       state.token = null;
       state.error = null;
       state.successMessage = null;
   })
   .addCase(logOut.rejected, (state, action) => {
       state.loading = false;
       state.error = action.payload || 'Unknown error';
   }) 
   .addCase(registerUser.pending, (state) => {
       state.loading = true;
       state.error = null;
       state.successMessage = null;
   })
   .addCase(registerUser.fulfilled, (state, action) => {
       if (action.payload.token) {
           localStorage.setItem("token", action.payload.token);
       }
       state.loading = false;
       state.user = action.payload.user;
       state.token = action.payload.token || getSavedToken();
       state.successMessage = 'Registration successful!';
   })
   .addCase(registerUser.rejected, (state, action) => {
       state.loading = false;
       state.error = action.payload || 'Unknown error';
   })
   .addCase(loginWithGoogle, (state, action)=>{
       if (action.payload.token) {
           localStorage.setItem("token", action.payload.token);
       }
       state.loading = false;
       state.error = false;
       state.user = action.payload.user;
       state.token = action.payload.token || getSavedToken();
   })
   .addCase(updateRole.pending, (state) => {
       state.loading = true;
   })
   .addCase(updateRole.fulfilled, (state, action) => {
       state.loading = false;
       state.error = false;
       state.user = action.payload.user;
       // Mantenemos el token existente
       state.token = state.token || getSavedToken();
   })
   .addCase(updateRole.rejected, (state, action) => {
       state.loading = false;
       state.error = action.payload;
   })
   .addCase(findAuthor.pending, (state) => {
    state.loading = true;
    state.error = null;
    })
    .addCase(findAuthor.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = { ...state.user, author: action.payload };
    }
        state.loading = false;
    })
    .addCase(findAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })
    .addCase(findCompany.pending, (state) => {
      state.loading = true;
      state.error = null;
      })
      .addCase(findCompany.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = { ...state.user, company: action.payload };
      }
          state.loading = false;
      })
      .addCase(findCompany.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      });
});

export default authReducer;