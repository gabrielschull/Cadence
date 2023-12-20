import * as pdfjsLib from 'pdfjs-dist/webpack'
import Papa from 'papaparse'

export const extractDocumentContent = async (file) => {
  const fileName = file.name.toLowerCase()
  const extension = fileName.slice(fileName.lastIndexOf('.') + 1)

  if (extension === 'pdf') {
    return extractPdfContent(file)
  } else if (extension === 'csv') {
    return extractCsvContent(file)
  } else {
    throw new Error('Unsupported file type')
  }
}

const extractPdfContent = async (file) => {
  const content = []

  const fileData = await file.arrayBuffer()
  const pdf = pdfjsLib.getDocument(fileData)
  const doc = await pdf.promise.then((doc) => {
    return doc
  })

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i)
    const text = await page.getTextContent()
    const pageContent = text.items.map((item) => {
      return item.str
    })
    content.push(pageContent.join(' '))
  }
  return { content }
}

const extractCsvContent = async (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results) => {
        resolve({ content: results.data })
      },
      error: (error) => {
        reject(error)
      }
    })
  })
}
