import axios from "axios";

export default axios.create({
  baseURL: "https://garden-help.herokuapp.com",
});
// export default axios.create({
//   baseURL: "http://localhost:8000",
// });