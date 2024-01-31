import styles from './index.module.scss'
import cName from 'classnames'
import type { NextPage } from 'next';
import axios from 'axios'
import { LOCALDOMAIN } from '@/utils';
import { IArticleIntro } from './api/articleIntro'
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import { Pagination } from '@douyinfe/semi-ui';
import { ThemeContext } from '@/stores/theme';

interface IProps {
  title: string,
  description: string,
  articles: {
    list: {
      label: string,
      info: string,
      link: string
    }[],
    total: number
  }
}

const Home: NextPage<IProps> = ({ title, description, articles }) => {
  const [content, setContent] = useState(articles)
  const mainRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    mainRef.current?.classList.remove(styles.withAnimation);
    window.requestAnimationFrame(() => {
      mainRef.current?.classList.add(styles.withAnimation);
    });
  }, [theme]);
  return (
    <div className={styles.container}>
      <main className={cName([styles.main, styles.withAnimation])} ref={mainRef}>
        <div
          className={cName({
            [styles.header]: true,
          })}
        />
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>《React SRR服务端渲染》</p>
        <div className={styles.grid}>
          {
            content?.list?.map((item, index) => (
              <Link href={item.link} key={index}>
                <div className={styles.card}>
                  <h2>{item.label} &rarr;</h2>
                  <p>{item.info}</p>
                </div>
              </Link>
            ))
          }
          <div className={styles.paginationArea}>
            <Pagination
              total={content?.total}
              pageSize={6}
              onPageChange={(pageNo: number): void => {
                axios.post(`${LOCALDOMAIN}/api/articleIntro`, {
                  pageNo,
                  pageSize: 6
                }).then(({ data }) => {
                  setContent({
                    list: data.list.map((item: IArticleIntro) => ({
                      label: item.label,
                      info: item.info,
                      link: `${LOCALDOMAIN}/article/${item.articleId}`
                    })),
                    total: data.total
                  })
                })
              }}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

Home.getInitialProps = async (context): Promise<IProps> => {
  const [homeResponse, articleResponse] = await Promise.all([
    await axios.get(`${LOCALDOMAIN}/api/home`),
    await axios.post(`${LOCALDOMAIN}/api/articleIntro`, {
      pageNo: 1,
      pageSize: 6
    })
  ])

  const homeData = homeResponse.data
  const articleData = articleResponse.data

  return {
    title: homeData.title,
    description: homeData.description,
    articles: {
      list: articleData.list.map((item: IArticleIntro) => ({
        label: item.label,
        info: item.info,
        link: `${LOCALDOMAIN}/article/${item.articleId}`
      })),
      total: articleData.total
    }
  }
}

export default Home