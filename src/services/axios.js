import axios from "axios"

export default axios({
  method: "post",
  url: "/user/12345",
  data: {
    firstName: "Fred",
    lastName: "Flintstone",
  },
  headers: {
    "Content-Type": "application/json",
  },
})
