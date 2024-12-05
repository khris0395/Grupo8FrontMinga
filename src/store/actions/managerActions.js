import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchManager = createAsyncThunk('manager/fetch', async () => {

    const response = await axios.get('')

})