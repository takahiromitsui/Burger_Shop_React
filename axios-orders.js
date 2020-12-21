import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://react-my-burger-914a5-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default instance;
