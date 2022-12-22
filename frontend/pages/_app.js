import axios from "axios";
import https from "https";
import Layout from '../components/Layout';
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-dropzone-uploader/dist/styles.css';
import "../public/assets/fonts/theme-icon/style.css";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import "../public/assets/css/designer.css";
import { ReactNotifications } from 'react-notifications-component';
import SSRProvider from 'react-bootstrap/SSRProvider'
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { NProgressBar } from "../components/NProgressBar";
import Script from "next/script";

axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false
})

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    if (pageProps.error) {
        return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />;
    }
    return (
        <SSRProvider>
            <Provider store={store}>
                <NProgressBar />
                <ReactNotifications />
                <Layout>
                    <Script src={`https://www.googletagmanager.com/gtm.js?id=G-K71WP0PP3F`} />
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </SSRProvider>
    )
}