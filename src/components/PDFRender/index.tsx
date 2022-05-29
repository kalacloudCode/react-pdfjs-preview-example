import React, { useEffect, useMemo, useRef, useState } from "react";
import { styled } from '@mui/styles'
import { usePDFData } from "./usePdf";
import { Page } from "./Page";

const Box = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})

const Sidebar = styled('div')({
  position: 'fixed',
  height: '100vh',
  boxSizing: 'border-box',
  padding: '40px 0 20px',
  background: 'rgb(34, 38, 45)',
  overflowY: 'auto',
  left: 0,
  top: 0,
  width: 300,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center'
})

const Preview = styled('div')({
  width: '50vw',
  paddingLeft: 300
})

const Image = styled('img')({
  marginTop: 20,
  width: 100,
  border: '6px solid transparent',
  cursor: 'pointer',
  '&.active': {
    borderColor: 'rgb(121, 162, 246)'
  }
})


const PageNumber = styled('span')({
  background: 'transparent',
  fontSize: 14,
  marginTop: 4,
  color: '#fff'
})

export const PDFRender: React.FC<{ src: string }> = (props) => {
  const { loading, urls, previewUrls } = usePDFData({
    src: props.src
  })
  const [currentPage, setCurrentPage] = useState(0)
  const io = useRef(new IntersectionObserver((entries) => {
    entries.forEach(item => {
      item.intersectionRatio >= 0.5 && setCurrentPage(Number(item.target.getAttribute('index')))
    })
  }, {
    threshold: [0.5]
  }))
  const goPage = (i: number) => {
    setCurrentPage(i)
    document.querySelectorAll('.page')[i]!.scrollIntoView({ behavior: 'smooth' })
  }
  if (loading) {
    return <div>loading...</div>
  }
  return (
    <Box>
      <Sidebar>
        {previewUrls.map((item, i) => (
          <React.Fragment key={item}>
            <Image
              src={item}
              className={currentPage === i ? 'active' : ''}
              onClick={() => goPage(i)}
            />
            <PageNumber>{i + 1}</PageNumber>
          </React.Fragment>
        ))}
      </Sidebar>
      <Preview>
        {urls.map((item, i) => (
          <Page index={i} io={io.current} src={item} key={item}/>
        ))}
      </Preview>
    </Box>
  )
}