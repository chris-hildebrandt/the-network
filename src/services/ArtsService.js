import { AppState } from "../AppState.js"
import { Art } from "../models/Art.js"
import { api } from "./AxiosService.js"

class ArtService {
  async getArt(){
    const res = await api.get('api/art')
    AppState.art = res.data.map(a => new Art(a))
  }
}
export const artService = new ArtService()