import axios from "axios";

const apiUrl = "http://localhost:8080/api/";

type RegisterUser = {
  username: string;
  email: string;
  password: string;
}

type LoginUser = {
  username: string;
  password: string;
}

type Event = {
  title: string;
  start: Date;
  end: Date;
  username: string;
}

type deleteEvent = {
  title: string | undefined;
  start: Date | undefined;
  end: Date | undefined;
  username: string;
}

type UpdateEvent = {
  title: string | undefined;
  start_time: Date | undefined;
  end_time: Date | undefined;
  username: string;
  newStart: Date;
  newEnd: Date;
}

export const registerUser = async (user: RegisterUser) => {
  try {
    const response = await axios.post(`${apiUrl}user/register`, user);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (user: LoginUser) => {
  try {
    const response = await axios.post(`${apiUrl}user/login`, user);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteEvent = async (event: deleteEvent) => {
  try {
    const response = await axios.post(`${apiUrl}event/deleteEvent`, event);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createEvent = async (event: Event) => {
  try {
    const response = await axios.post(`${apiUrl}event/createEvent`, event);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUserEvents = async (username: string) => {
  try {
    const response = await axios.get(`${apiUrl}event/getUserEvents`, {
      headers:{
        username: username
      }
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateEvent = async (event: UpdateEvent) => {
  try {
    const response = await axios.put(`${apiUrl}event/updateEvent`, event);
    return response.data;
  } catch (error) {
    return error;
  }
};

