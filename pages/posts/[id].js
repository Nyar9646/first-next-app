// 表示されるURLイメージ : http://~~.~~/posts/[id]

import Layout from "../../components/layout";
import { getIds, getPostById } from "../../lib/posts";

// async 非同期

export const getStaticPaths = async () => {
    return {
        paths: getIds(),

        // 存在しないパスでページを表示しようとしたとき404エラーとする
        fallback: false
    }
}

// {params} : 表示したページのパスを取得
export const getStaticProps = async ({ params }) => {
    return {
        props: {
            // params をそのまま表示する場合、":" 不要
            params
            // post: getPostById(params.id)
        }
    }
}

export default function Post({ params }) {
    return (
        <Layout pageTitle={'Article'}>
            {params.id}
            {/* <h2>{post.title}</h2> */}
            {/* <p>{post.content}</p> */}
        </Layout>
    )
}
