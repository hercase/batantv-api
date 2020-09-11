const axios = require('axios').default;

const key = 'AIzaSyAxgOxgraVNuvTyYdz9iy3E6DDLbOwEZwo';

const instance = axios.create({
  baseURL:'https://www.googleapis.com/youtube/v3/search',
  params : {
    key,
    channelId: 'UCPJt1Ugnfq-ZcoXsbWziafw',
    part: 'snippet',
    order: 'date',
    maxResults: '2'
  },
  headers: {}
});

module.exports = {

  // Cambia las rutas de las peticiones segun el servicio.
  getList: async () => {
    return await instance.get()
  },
  
  }