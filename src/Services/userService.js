import api from './api'
const userService = {
  getUsers: async () =>  {
    try {
      const response = await api.get('usuario')
      return response.data
    } catch (error) {
      throw("Erro na chamada da api" + error)
    }
  },
  cadastrar: (email, senha, nome, token) => {
    const user = {email, senha, nome, token}
    return api.post('usuario', user)
  },
  login: (email, senha) => {
    return api.post('usuario/login', {email, senha})
  }
}
export default userService