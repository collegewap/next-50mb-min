import React from 'react'
import Head from 'next/head'

export type HeaderProps = {
  title: string
  description: string
}

export const Header = ({ title, description }: HeaderProps): JSX.Element => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
    </div>
  )
}

export default Header
