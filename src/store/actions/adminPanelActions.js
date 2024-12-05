import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

export const SET_SEARCH = 'SET_SEARCH'
export const TOGGLE_STATUS = 'TOGGLE_STATUS'

export const fetchAdminPanel = createAsyncThunk(
    'adminPanel/fetchData',
    async (search = '', { rejectWithValue }) => {
        try {
            const [authorsResponse, companiesResponse] = await Promise.all([
                axios.get('http://localhost:8080/api/authors/allAuthors'),
                axios.get('http://localhost:8080/api/companies/allCompanies')
            ]);
            const authors = authorsResponse.data.authors.map(author => ({
                id: author._id,
                name: author.name,
                lastName: author.last_name,
                city: author.city,
                country: author.country,
                date: author.date,
                avatar: author.photo,
                userId: author.user_id,
                isActive: author.active,
                createdAt: author.createdAt,
                updatedAt: author.updatedAt
            }));

            const companies = companiesResponse.data.companies.map(company => ({
                id: company._id,
                name: company.name,
                website: company.website,
                description: company.description,
                photo: company.photo,
                userId: company.user_id,
                isActive: company.active,
                createdAt: company.createdAt,
                updatedAt: company.updatedAt
            }));

            const filteredCompanies = search ? companies.filter(company =>
                company.name.toLowerCase().includes(search.toLowerCase()) ||
                company.website.toLowerCase().includes(search.toLowerCase()) ||
                company.description.toLowerCase().includes(search.toLowerCase())
            ) : companies;

            const filteredAuthors = search ? authors.filter(author =>
                author.name.toLowerCase().includes(search.toLowerCase()) ||
                author.lastName?.toLowerCase().includes(search.toLowerCase()) ||
                author.city.toLowerCase().includes(search.toLowerCase()) ||
                author.country.toLowerCase().includes(search.toLowerCase())
            ) : authors;

            return {
                teams: filteredCompanies,
                authors: filteredAuthors
            }
        } catch (error) {
            console.error('Error details:', error);
            return rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                'Error al cargar los datos. Por favor, intente nuevamente.'
            );
        }
    }
)

export const toggleStatus = createAsyncThunk(
    'adminPanel/toggleStatus',
    async ({ id, type }, { rejectWithValue }) => {
        try {
            const endpoint = type === 'author' ?
                `http://localhost:8080/api/authors/toggle/${id}` :
                `http://localhost:8080/api/companies/toggle/${id}`;

            const response = await axios.patch(endpoint);

            return {
                id,
                type,
                newStatus: response.data.active
            };
        } catch (error) {
            console.error('Toggle error details:', error);
            return rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                'Error al cambiar el estado'
            );
        }
    }
)

export const setSearch = (searchTerm) => ({
    type: SET_SEARCH,
    payload: searchTerm
})