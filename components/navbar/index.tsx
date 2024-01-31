import { Environment, Themes } from "@/constants/enum";
import { ThemeContext } from "@/stores/theme";
import { UserAgentContext } from "@/stores/userAgent";
import { FC, useContext } from "react";
import styles from "./styles.module.scss";
export interface INavBarProps { }

export const Navbar: FC<INavBarProps> = ({ }) => {
    const { setTheme } = useContext(ThemeContext)
    const { userAgent } = useContext(UserAgentContext)
    return (
        <div className={styles.navbar}>
            <a href="http://127.0.0.1:8080/">
                <div className={styles.logoIcon}></div>
            </a>
            <div className={styles.themeArea}>
                <div className={styles.popupText}>弹窗</div>
                {
                    userAgent === Environment.pc && (
                        <span className={styles.text}>当前是PC端样式</span>
                    )
                }
                {
                    userAgent === Environment.ipad && (
                        <span className={styles.text}>当前是Ipad端样式</span>
                    )
                }
                {
                    userAgent === Environment.mobile && (
                        <span className={styles.text}>当前是移动端样式</span>
                    )
                }
                <div className={styles.themeIcon}
                    onClick={(): void => {
                        if (localStorage.getItem("theme") === Themes.light) {
                            setTheme(Themes.dark)
                        } else {
                            setTheme(Themes.light)
                        }
                    }}
                >
                </div>
            </div>
        </div>
    )
}
