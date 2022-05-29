import { styled } from "@mui/styles";
import { useLayoutEffect, useRef } from "react";

const Image = styled('img')({
  marginBottom: 20,
  width: '100%'
})

export const Page = (props: { src: string, io: any, index: number }) => {
  const { io, src, index } = props
  const ref = useRef<HTMLImageElement | null>(null)
  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }
    io.observe(ref.current)
    ref.current?.setAttribute('index', String(index))
    return () => io.unobserve(ref.current)
  })
  return (
    <Image className="page" src={src} ref={ref} />
  )
}