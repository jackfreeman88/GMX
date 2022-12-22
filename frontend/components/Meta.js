import Head from "next/head";

function Meta({title, description, keywords }) {
    return ( 
        <Head>
            <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width"/>
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <title>{title}</title>
        </Head>
     );
}

Meta.defaultProps = {
    title: 'GMX',
    keywords: 'GMX',
    description: 'GMX'
}

export default Meta;