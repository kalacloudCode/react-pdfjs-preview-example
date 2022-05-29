import { PDFRender } from "./components/PDFRender";

const pdfFilePath = '/kalacloud-demo.pdf'

export const App = () => {
  return (
    <PDFRender src={pdfFilePath} />
  )
}