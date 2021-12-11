// Next.js：pages ディレクトリのファイル名で routing できる
// index.js = 'localhost:3000/'

import { nanoid } from "nanoid"
import Link from "next/link"
import Layout from "../components/layout"
import { getPosts } from "../lib/posts"

// 'getStaticProps' という名称であること
//    ビルド時に外部のデータを取得する処理を行う　(その後レンダリングとなる)
export const getStaticProps = async () => {
  return {
    props: {
      posts: getPosts()
    }
  }
}

// 「動的ルーティング」：ファイル名から自動的に表示を割り当てる

export default function Home({ posts }) {
  return (
    <Layout pageTitle={'Home'}>
      <Link href='/about'>
        <a>About</a>
      </Link>
      <ul>
        {posts.map(({ title }) => {
          return <li key='nanoid()'>{title}</li>
        })}
      </ul>
    </Layout>
  )
}
