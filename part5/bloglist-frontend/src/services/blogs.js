import axios from "axios";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  return axios.get("/api/blogs").then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post("/api/blogs", newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${"/api/blogs"}/${id}`, newObject);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${"/api/blogs"}/${id}`, config);
  return response.data;
};

export default { getAll, create, update, remove, setToken };
