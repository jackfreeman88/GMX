import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="/assets/fonts/kit-pro.fontawesome.com/v5.12.1/css/pro.min.css"
        />
        <link rel="stylesheet" href="/assets/fonts/poppins/stylesheet.css" />

        <script
          type="text/javascript"
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDlXP-Nx4Vdn88KZ8ELkkANr-OjhJBbmTU&libraries=places"
          defer
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html:
              `(function(w,l){` +
              `w[l] = w[l] || [];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});` +
              `})(window,'dataLayer');`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
