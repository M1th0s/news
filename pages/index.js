import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import PageLayout from '../components/PageLayout'
import styles from '../styles/Home.module.css'


export default function Home({ articles }) {
  return (
    <PageLayout title='NewsApp - Home'>
      <div className={styles.container}>
        {articles.length === 1 && <p>No tenemos articulos!</p>}
        {articles.length > 0 && articles.map((article, index) => (
          <div key={index}>
            <Image 
              alt={`Image for the article ${article.title}`} 
              src={article.urlToImage}
              width={450}
              height={300}
              layout='responsive'
            />
            <h2>
              {article.title}
            </h2>
              <p>
                {article.description}
              </p>
          </div> 
        ))}
          <Link href='/about'>Ir About</Link>
      </div>
    </PageLayout>
  )
}
// N request -> se ejecuta 1 vez en el build time o para refrescar la pagina
export async function getStaticProps() {
  const response = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2022-08-08&sortBy=publishedAt&apiKey=4dd1692f2a624fb3a6f50e64cc96f71f')
  const { articles } = await response.json()
  return {
    props: {
      articles
    }
  }


/*ESTE METODO SE EJECUTA EN EL SERVIDOR 'context' acceder la request y al response, cambiar los header etc 
N equest -> se ejecuta N veces  // datos dinamicos// */

// export async function getServerSideProps(context) {
//   const response = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2022-08-08&sortBy=publishedAt&apiKey=4dd1692f2a624fb3a6f50e64cc96f71f')
//   const { articles } = await response.json()
//   return {
//     props: {
//       articles
//     }
//   }
}


