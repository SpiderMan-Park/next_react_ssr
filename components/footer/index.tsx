import styles from "./styles.module.scss";
import Image from "next/image";
import { FC } from "react";
import publicLogo from "@/public/public_logo.png";
import cName from 'classnames'
interface ILink {
    label: string;
    link?: string;
}

interface ILinkList {
    title: string;
    list: Array<ILink>;
}

export interface IFooterProps {
    title: string;
    linkList: Array<ILinkList>;
    copyRight: string;
    siteNumber: string;
    publicNumber: string;
}


export const Footer: FC<IFooterProps> = ({
    title,
    linkList,
    copyRight,
    siteNumber,
    publicNumber
}) => {
    return (
        <div className={styles.footer}>
            <div className={styles.topArea}>
                <h1 className={styles.footerTitle}>{title}</h1>
                <div className={styles.linkListArea}>
                    {
                        linkList?.map((item, index) => {
                            return (
                                <div className={styles.linkArea} key={`linkArea${index}`}>
                                    <span className={styles.title}>{item.title}</span>
                                    <div className={styles.links}>
                                        {
                                            item?.list.map((_item, _index) => {
                                                return (
                                                    <div
                                                        className={cName({
                                                            [styles.link]: _item.link,
                                                            [styles.disabled]: !_item.link,
                                                        })}
                                                        onClick={(): void => {
                                                            _item.link &&
                                                                window.open(
                                                                    _item.link,
                                                                    "blank",
                                                                    "noopener=yes,noreferrer=yes"
                                                                );
                                                        }}
                                                        key={`link${_index}`}
                                                    >
                                                        {_item.label}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={styles.bottomArea}>
                <div className={styles.numArea}>
                    <span>{copyRight}</span>
                    <span>{siteNumber}</span>
                    <div className={styles.publicLogo}>
                        <div className={styles.logo}>
                            <Image
                                src={publicLogo}
                                alt={publicNumber}
                                width={20}
                                height={20}
                            ></Image>
                        </div>
                        <span>{publicNumber}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
