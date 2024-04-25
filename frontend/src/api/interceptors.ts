import axios, { type CreateAxiosDefaults } from "axios"

const options: CreateAxiosDefaults = {
  baseURL: "http://localhost:4200/api/url",
  headers: {
    "Content-Type": "application/json",
  },
}

export default axios.create(options)
