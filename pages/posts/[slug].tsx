import fs from 'fs'
import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client'
import path from 'path'
import React from 'react'
import { remarkMdxImages } from 'remark-mdx-images'
import CustomImage from '../../components/common/CustomImage'
import CustomLink from '../../components/common/CustomLink'
import Header from '../../components/header/Header'
import { getPostFilePaths, readPostFilePaths } from '../../utils/mdxUtils'

export default function PostPage({
  source,
  frontMatter,
}: {
  source: string
  frontMatter: frontMatter
}): JSX.Element {
  const Component = React.useMemo(() => getMDXComponent(source), [source])

  return (
    <>
      <Header title={frontMatter.title} description={frontMatter.description} />
      <header>
        <nav>
          <CustomLink href="/" as="/">
            Home
          </CustomLink>
        </nav>
      </header>
      <div className="post-header">
        <h1>{frontMatter.title}</h1>
        {frontMatter.description && (
          <p className="description">{frontMatter.description}</p>
        )}
      </div>
      <main>
        <Component components={{ a: CustomLink, img: CustomImage }} />
      </main>
    </>
  )
}

type frontMatter = {
  [key: string]: any
}
type MdxProps = {
  props: {
    source: string
    frontMatter: frontMatter
  }
}

export const getStaticProps = async ({
  params,
}: {
  params: SlugParams
}): Promise<MdxProps> => {
  const postFilePaths = readPostFilePaths()
  const postFilePath = postFilePaths.find((item) => item.slug === params.slug)
  const source = fs.readFileSync(postFilePath.path)

  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'esbuild.exe'
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'bin',
      'esbuild'
    )
  }

  const result = await bundleMDX(source.toString(), {
    cwd: path.dirname(postFilePath.path),
    xdmOptions: (options) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkMdxImages,
      ]

      return options
    },
    esbuildOptions: (options) => {
      options.outdir = path.join(process.cwd(), 'public/img/posts', params.slug)
      options.loader = {
        ...options.loader,
        '.jpg': 'file',
        '.png': 'file',
        '.gif': 'file',
      }
      options.publicPath = `/img/posts/${params.slug}`
      options.write = true

      return options
    },
  })

  return {
    props: {
      source: result.code,
      frontMatter: result.frontmatter,
    },
  }
}

type SlugParams = {
  slug: string
}

type PathProps = {
  paths: { params: SlugParams }[]
  fallback: boolean
}

export const getStaticPaths = async (): Promise<PathProps> => {
  const paths = getPostFilePaths()
    // Map the path into the static paths object required by Next.js
    .map((item) => ({ params: { slug: item.slug } }))

  return {
    paths,
    fallback: false,
  }
}
