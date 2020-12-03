import api from './api'
const limpezaService = {
  getLimpezas: async () =>  {
    try {
      const response = await api.get('limpeza')
      return response.data
    } catch (error) {
      throw("Erro na chamada da api" + error)
    }
  },
  getLimpezasByUsuarioId: async (usuarioId) =>  {
    try {
      const response = await api.get('limpeza/'+usuarioId)
      return response.data
    } catch (error) {
      throw("Erro na chamada da api" + error)
    }
  },
  salvar: (novaLimpeza) => {
    return api.post('limpeza', novaLimpeza)
  },
  executarLimpeza: (limpezaId) => {
    return api.post('limpeza/executar-limpeza/' + limpezaId)
  },
  excluir: (limpezaId) => {
    return api.delete('limpeza/' + limpezaId)
  }
}
export default limpezaService