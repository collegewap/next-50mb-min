import fs from 'fs'
import path from 'path'
import klawSync from 'klaw-sync'

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'posts')

type PostPath = {
  path: string
  slug: string
}

const metaDataPath = path.join(process.cwd(), 'all-posts.json')

export const getPostFilePaths = (): PostPath[] => {
  const postFilePaths = klawSync(POSTS_PATH, { nodir: true })
    // Only include md(x) files
    .filter((item) => /\.mdx?$/.test(item.path))
    .map((item) => ({
      path: item.path,
      slug: path.basename(item.path).replace(/\.mdx?$/, ''),
    }))

  // Need to store in a file again due to https://github.com/vercel/next.js/discussions/11272
  fs.writeFileSync(metaDataPath, JSON.stringify(postFilePaths))
  return postFilePaths
}

export const readPostFilePaths = (): PostPath[] => {
  return JSON.parse(fs.readFileSync(metaDataPath).toString())
}
