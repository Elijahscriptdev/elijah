import axios from 'axios';
export const FETCH_DATA_PENDING = 'FETCH_DATA_PENDING';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';

function fetchDataPending() {
  return {
    type: FETCH_DATA_PENDING,
  };
}

function fetchDataSuccess(signInInfo) {
  return {
    type: FETCH_DATA_SUCCESS,
    signInInfo,
  };
}

function fetchDataError(error) {
  return {
    type: FETCH_DATA_ERROR,
    error,
  };
}
const postSignIn = (email, password) => async (dispatch) => { 
  
  try {
    const response = await axios.post(
      "https://team065a-backend-arch.herokuapp.com/api/v1/sign_in",
      {
        login: {
          email: email,
          password: password,
        },
      },
      { withCredentials: true }
    );
    // status = success - error, message,  data = { id, full_name,  email, phone, user_type}
    console.log(response.data);
    dispatch(fetchDataSuccess(response.data));
    return response.data;
  } catch (error) {
    console.log("login error", error);
    dispatch(fetchDataError(error));
  }
  console.log("form submitted");
}


export {
  fetchDataSuccess,
  fetchDataPending,
  fetchDataError,
  postSignIn,
};
