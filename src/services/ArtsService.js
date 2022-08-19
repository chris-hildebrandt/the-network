import { AppState } from "../AppState.js"
import { Art } from "../models/Art.js"
import { api } from "./AxiosService.js"

class ArtsService {
  async getArt(){
    const res = await api.get('api/ads')
    AppState.arts = res.data.map(a => new Art(a))
  }
}
export const artsService = new ArtsService()