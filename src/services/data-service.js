export default class DataService {

    _apiBase = 'http://localhost:3000/data'

    getResource = async (url = '') => {
        const res = await fetch(`${this._apiBase}${url}`)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        return await res.json()
    }

    getData = () => this.getResource()
}