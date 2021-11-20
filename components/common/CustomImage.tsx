import React from 'react'
import Image, { ImageLoaderProps } from 'next/image'
const CustomImage = ({
  src,
  ...otherProps
}: React.PropsWithChildren<ImageLoaderProps>): JSX.Element => {
  return (
    <div className="imageContainer">
      <Image
        src={src}
        {...otherProps}
        width="600"
        height="400"
        className="image"
        placeholder="empty"
      />
    </div>
  )
}

export default CustomImage
