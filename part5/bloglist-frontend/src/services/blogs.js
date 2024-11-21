import axios from "axios";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get("/api/blogs");
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post("/api/blogs", newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${"/api/blogs"}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, update, setToken };
