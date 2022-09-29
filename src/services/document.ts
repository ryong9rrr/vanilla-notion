import Api from '~/core/api'

class DocumentApi extends Api {
  async getAllDocument() {
    return await this.request('/documents')
  }

  async getDocument(documentId: number) {
    return await this.request(`/documents/${documentId}`)
  }

  async postNewDocument({ title, parentNodeId }: { title: string; parentNodeId: number }) {
    return await this.request('/documents', {
      method: 'POST',
      body: JSON.stringify({ title, parent: parentNodeId }),
    })
  }

  async removeDocument(documentId: number) {
    return await this.request(`/documents/${documentId}`, {
      method: 'DELETE',
    })
  }

  async editDocument(documentId: number, requestBodyObj: { title: string; content: string }) {
    const { title, content } = requestBodyObj
    return await this.request(`/documents/${documentId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
    })
  }
}

const documentApi = new DocumentApi()

export default documentApi
