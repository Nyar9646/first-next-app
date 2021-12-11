// /pages/_app.js

import Head from 'next/head'

// Next : css を module として import。クラス名を他のファイルと被らないよう自動付与される
//      global の css 定義は、/style/globals.css に追加する
import styles from './layout.module.css'

export default function Layout({ children, pageTitle }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>My Blog | {pageTitle}</title>
            </Head>
            <h1>My Blog</h1>
            {children}
        </div>
    )
}
