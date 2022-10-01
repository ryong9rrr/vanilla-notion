import Api from '~/core/api'
import { IDocument } from '~/models/document'

class DocumentApi extends Api {
  async getAllDocument(): Promise<IDocument[]> {
    return await this.request('/documents')
  }

  async getDocument(documentId: number): Promise<Required<IDocument>> {
    return await this.request(`/documents/${documentId}`)
  }

  async postNewDocument({
    title,
    parentNodeId,
  }: {
    title: string
    parentNodeId?: number
  }): Promise<Required<Omit<IDocument, 'documents' | 'content'>>> {
    return await this.request('/documents', {
      method: 'POST',
      body: JSON.stringify({ title, parent: parentNodeId || null }),
    })
  }

  async removeDocument(documentId: number): Promise<void> {
    return await this.request(`/documents/${documentId}`, {
      method: 'DELETE',
    })
  }

  async editDocument(
    documentId: number,
    requestBodyObj: { title: string; content: string }
  ): Promise<{ title: string; content: string }> {
    const { title, content } = requestBodyObj
    return await this.request(`/documents/${documentId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
    })
  }
}

const documentApi = new DocumentApi()

export default documentApi
