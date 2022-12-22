import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { useRouter } from "next/router";
import { useEffect } from "react";

const NProgressBar = (config) => {
    const router = useRouter()

    NProgress.configure({ showSpinner: false, ...config });

    useEffect(() => {
        const handleStart = (url) => {
            NProgress.start()
        }
        const handleStop = () => {
            NProgress.done()
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleStop)
        router.events.on('routeChangeError', handleStop)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleStop)
            router.events.off('routeChangeError', handleStop)
        }
    }, [router])
    return null;
};

export { NProgressBar };