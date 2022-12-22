import { useEffect, useState } from 'react';

// async function getFileFromLink(url) {
//     const fileRes = await fetch(url);
//     const blob = await fileRes.blob();
//     const blobUrl = URL.createObjectURL(blob)
//     console.log('blobUrl', blobUrl);
//     return blobUrl;
// }
function Video() {
    // const url = getFileFromLink('https://livshows-dev.s3.us-east-2.amazonaws.com/mintback/1656046417_1654544094_1.png');
    const [url, setUrl] = useState('');
    // async () => {
    //     const fileRes = await fetch('https://livshows-dev.s3.us-east-2.amazonaws.com/mintback/1656046417_1654544094_1.png');
    //     const blob = await fileRes.blob();
    //     const blobUrl = URL.createObjectURL(blob)
    //     // console.log(blobUrl);
    //     // return blobUrl
    //     setUrl(blobUrl);
    //     return;
    // }
    useEffect( async () => {
        // getUrl();
        
        const fileRes = await fetch('https://livshows-dev.s3.us-east-2.amazonaws.com/mintback/1656046417_1654544094_1.png');
        const blob = await fileRes.blob();
        const blobUrl = URL.createObjectURL(blob)
        console.log(blobUrl);
    }, [])
    return ( 
        <div>
        {/* <a href={url}>{url}</a> */}
        </div>
     );
}

export default Video;