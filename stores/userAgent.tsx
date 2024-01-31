import { Environment } from "@/constants/enum"
import { createContext, useEffect, useState } from "react"

interface IUserAgentContextProps {
    userAgent: Environment
}

interface IProps {
    children: JSX.Element
}

export const UserAgentContext = createContext<IUserAgentContextProps>({} as IUserAgentContextProps)

export const UserAgentProvider = ({ children }: IProps): JSX.Element => {
    const [userAgent, setUserAgent] = useState<Environment>(Environment.none)

    useEffect(() => {
        const checkUserAgent = (): void => {
            const width = document.body.offsetWidth
            if (width < 768) {
                setUserAgent(Environment.mobile)
            } else if (width >= 768 && width < 1200) {
                setUserAgent(Environment.ipad)
            } else if (width >= 1200) {
                setUserAgent(Environment.pc)
            } else {
                setUserAgent(Environment.none)
            }
        }
        checkUserAgent()
        window.addEventListener('resize', checkUserAgent)
        return (): void => {
            window.removeEventListener('resize', checkUserAgent)
        }
    }, [typeof document !== 'undefined' && document.body.offsetWidth])

    return <UserAgentContext.Provider value={{userAgent}}>{children}</UserAgentContext.Provider>
}