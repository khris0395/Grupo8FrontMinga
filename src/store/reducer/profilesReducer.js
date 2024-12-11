import { createReducer } from "@reduxjs/toolkit";
import { getProfile, updateCompany, updateAuthor } from "../actions/profilesActions";

const initialState = {
  profile: [], // Información general del perfil
  mangas: [], // Mangas asociados al perfil
  role: null, // Rol del usuario (Author o Company)
  loading: false, // Carga general
  error: null, // Errores generales
  status: null, // Estado de las acciones específicas (loading, succeeded, failed)
  authorData: null, // Datos actualizados del autor
  companyData: null, // Datos actualizados de la compañía
};

export const profilesReducer = createReducer(initialState, (builder) => {
  builder
    // Caso: getProfile
    .addCase(getProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
      state.mangas = action.payload.mangas;
      state.role = action.payload.role;
      state.loading = false;
      state.error = null;
    })
    .addCase(getProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    // Caso: updateCompany
    .addCase(updateCompany.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(updateCompany.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.companyData = action.payload; // Actualiza la información de la compañía
      state.error = null;
    })
    .addCase(updateCompany.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload || action.error.message || "An error occurred.";
    })

    // Caso: updateAuthor
    .addCase(updateAuthor.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(updateAuthor.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.authorData = action.payload; // Actualiza la información del autor
      state.error = null;
    })
    .addCase(updateAuthor.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload || action.error.message || "An error occurred.";
    });
});
