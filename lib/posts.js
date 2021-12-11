// rendering = html生成
//  react => cliant side rendering : ブラウザに備わっている jsエンジン でレンダリング
//      => js が無効な環境では動かない(近年ではそうそうない)
//  事前レンダリング ... Next.jsで備わっている。↓2つ_
//      1. SSG <Static Site Generate> : Next.js 推奨。ビルド時にレンダリング
//          サーバ再起動をして、ビルドを行う
//      2. SSR <Server Side Renderring> : server request の度にレンダリング

// 今回、blog を実装するにあたり、採用するレンダリング = SSG
//      外部にある blog 投稿データを取得した上でレンダリングをする方法を実装していく

// 拡張子 .md = マークダウン形式

// ノードで実行する性質上、必要となるlib
import fs from 'fs'
import path from 'path'

// .md 解析
import matter from 'gray-matter'

const postsDirPath = path.join(process.cwd(), 'posts')

export function getPosts() {
    // 同期的にディレクトリを読み込む。ファイル名を配列で返す
    //      postnames = ['first-post.md']
    const postNames = fs.readdirSync(postsDirPath)

    // returnは配列
    return postNames.map(postname => {
        const postPath = path.join(postsDirPath, postname)
        const result = matter(fs.readFileSync(postPath, 'utf8'))
        return result.data
    })
}

// 「動的routing」
//      ex : 投稿した記事を表示するページを形式化している
export function getIds() {
    const postNames = fs.readdirSync(postsDirPath)

    return postNames.map(postName => {
        return {
            params: {
                // 拡張子をなくしたファイル名をidとする
                id: postName.replace(/\.md$/, '')
            }
        }
    })
}

export function getPostById(id) {
    const postPath = path.join(postsDirPath, '${id}.md')
    const result = matter(fs.readFileSync(postPath, 'utf8'))

    return {
        id,
        ...result.data,
        content: result.content
    }
}
