import axios from "@/api/interceptors"
import type { TUrl } from "@/types/url.type"

export const urlService = {
  async getUrl(data: { uid: string }) {
    return await axios.post<TUrl>("get-url", data)
  },

  async createUid(data: { url: string }) {
    return await axios.post<TUrl>("create", data)
  },
}
