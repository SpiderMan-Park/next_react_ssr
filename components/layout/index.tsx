import { FC } from "react";
import { Footer, IFooterProps } from '../footer/index'
import { Navbar, INavBarProps } from '../navbar/index'
import styles from "./styles.module.scss";

export interface ILayoutProps {
    navbarData: INavBarProps,
    footerData: IFooterProps
}

export const Layout: FC<ILayoutProps & { children: JSX.Element }> = ({ children, navbarData, footerData }) => {
    return (
        <div className={styles.layout}>
            <Navbar {...navbarData} />
            <main className={styles.main}>{children}</main>
            <Footer {...footerData} />
        </div>
    )
}

