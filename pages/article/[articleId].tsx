import React from 'react'
import { NextPage } from 'next'
import axios from 'axios'
import styles from './styles.module.scss'
import { LOCALDOMAIN } from '@/utils';
const showdown = require('showdown');


export interface IArticleProps {
    title: string;
    author: string;
    description: string;
    createTime: string;
    content: string;
}


const Article: NextPage<IArticleProps> = ({ title, author, description, createTime, content }) => {
    const converter = new showdown.Converter();

    return (
        <div className={styles.article}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.info}>
                作者：{author} | 创建时间：{createTime}
            </div>
            <div className={styles.description}>{description}</div>
            <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }} className={styles.content}></div>
        </div>
    )
}

Article.getInitialProps = async (context): Promise<IArticleProps> => {

    const { articleId } = context.query;
    const { data } = await axios.get(`${LOCALDOMAIN}/api/articleInfo`, {
        params: {
            articleId,
        },
    });

    console.log('data', data)
    return data;
};

export default Article