import React from 'react'
import { Header } from '../../../components/header/Header'
import { render } from '../../testUtils'

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>
    },
  }
})

describe('Header', () => {
  const headerProps = {
    title: 'This is a heading',
    description: 'This is a description',
  }
  it('matches snapshot', () => {
    const { asFragment } = render(<Header {...headerProps} />, {})
    expect(asFragment()).toMatchSnapshot()
  })
  it('has a title tag', () => {
    const { container } = render(<Header {...headerProps} />, {})
    const title = container.getElementsByTagName('title')[0]

    expect(title).toBeTruthy()
    expect(title?.innerHTML).toBe(headerProps.title)
  })
  it('has a meta description tag', () => {
    const { container } = render(<Header {...headerProps} />, {})
    const description: HTMLMetaElement = container.querySelector(
      'meta[name=description]'
    )

    expect(description).toBeTruthy()
    expect(description.content).toBe(headerProps.description)
  })
})
