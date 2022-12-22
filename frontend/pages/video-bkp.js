const axios = require('axios');
import { useEffect, useRef, useState } from "react";
import { REACT_APP_API_BASE_URL } from "../config/server.config";
import { VideoJS } from "../components/VideoJs";

// const Blob = require('node-blob');
// function typedArrayToURL(typedArray, mimeType) {
//     if(typedArray){
//         return URL.createObjectURL(typedArray)
//     }
// }

// function getFilenameFromContentDisposition(res) {
//     let filename = null;
  
//     const disposition = res.headers.get("content-disposition");
  
//     if (disposition?.includes("attachment")) {
//       const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
//       const matches = filenameRegex.exec(disposition);
//       if (matches?.[1]) {
//         filename = matches[1].replace(/['"]/g, "");
//         // Sometimes the filename comes in a URI encoded format so decode it
//         filename = decodeURIComponent(filename);
//         // Sometimes the filename starts with UTF-8, remove that
//         filename = filename.replace(/^UTF-8/i, "").trim();
//       }
//     }
  
//     return filename;
//   }

// async function getFileFromLink(url) {
//     const fileRes = await fetch(url);
//     const blob = await fileRes.blob();

//     let fileName = getFilenameFromContentDisposition(fileRes);
//     if (!fileName) {
//         fileName = url.split("/").pop();
//     }

//     const file = new File([blob], fileName, {
//         type: blob.type,
//     });
//     console.log('file', file);
//     return file;
// }
function Video() {
    const playerRef = useRef(null);
    const files = [
        'sample_960x400_ocean_with_audio.3gp',
        'sample_960x400_ocean_with_audio.asf',
        'sample_960x400_ocean_with_audio.avi',
        'sample_960x400_ocean_with_audio.f4v',
        'sample_960x400_ocean_with_audio.flv',
        'sample_960x400_ocean_with_audio.hevc',
        'sample_960x400_ocean_with_audio.m2ts',
        'sample_960x400_ocean_with_audio.m2v',
        'sample_960x400_ocean_with_audio.m4v',
        'sample_960x400_ocean_with_audio.mjpeg',
        'sample_960x400_ocean_with_audio.mkv',
        'sample_960x400_ocean_with_audio.mov',
        'sample_960x400_ocean_with_audio.mp4',
        'sample_960x400_ocean_with_audio.mpeg',
        'sample_960x400_ocean_with_audio.mpg',
        'sample_960x400_ocean_with_audio.mts',
        'sample_960x400_ocean_with_audio.mxf',
        'sample_960x400_ocean_with_audio.rm',
        'sample_960x400_ocean_with_audio.ts',
        'sample_960x400_ocean_with_audio.vob',
        'sample_960x400_ocean_with_audio.webm',
        'sample_960x400_ocean_with_audio.wmv',
        'sample_960x400_ocean_with_audio.wtv',
        'sample_1280x720.swf',
        'sample_1280x720_surfing_with_audio.ogv',
        'file_example_OGG_640_2_7mg.ogg'
    ]
    const types = [
        'video/3gpp',
        'video/x-ms-asf',
        'video/x-msvideo',
        'video/mp4',
        'video/x-flv',
        'application/octet-stream',
        'video/mp2t',
        'video/mpeg',
        'video/x-m4v',
        'image/jpeg',
        'video/x-matroska',
        'video/quicktime',
        'video/mp4',
        'video/mpeg',
        'video/mpeg',
        'video/MP2T',
        'application/mxf',
        'video/ogg',
        'video/mp2t',
        'application/x-shockwave-flash',
        'video/webm',
        'video/x-ms-wmv',
        'video/webm',
        'application/x-shockwave-flash',
        'video/ogg',
        'video/ogg'
    ]
    const [blobUrls, setBlobUrls] = useState([]);

    const sources = files.map((file) => {
        return (
            {
                'src': REACT_APP_API_BASE_URL + '/get/file/axis-point-media/'+file,
            }
        )
    })

    // useEffect(async () => {
    //     let urls = [];
    //     for await (const file of files){
    //         const fileRes = await fetch(REACT_APP_API_BASE_URL + '/get/file/axis-point-media/'+file);
    //         const blob = await fileRes.blob();
    //         urls.push(URL.createObjectURL(blob));
    //     }
    //     setBlobUrls([...urls]);
    // }, [])
    
    // const videoJsOptions = {
    //     autoplay: true,
    //     controls: true,
    //     responsive: true,
    //     fluid: true,
    //     sources: [{
    //       src: REACT_APP_API_BASE_URL + '/get/file/axis-point-media/SampleVideo_1280x720_1mb.mp4',
    //       type: 'video/mp4'
    //     }],
    //     // sources: sources
    //     // src: REACT_APP_API_BASE_URL + '/get/file/axis-point-media/sample_960x400_ocean_with_audio.mkv',
    //     // data-setup: { "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/watch?v=xjS6SftYQaQ"}] }
    // };

    const handlePlayerReady = (player) => {
        playerRef.current = player;
    
        // You can handle player events here, for example:
        player.on('waiting', () => {
          videojs.log('player is waiting');
        });
    
        player.on('dispose', () => {
          videojs.log('player will dispose');
        });
    };
    // const file = REACT_APP_API_BASE_URL + '/get/file/axis-point-media/sample_960x400_ocean_with_audio.mkv';
    // const file = async () => (
    //     await axios.get( REACT_APP_API_BASE_URL + '/get/file/axis-point-media/sample_960x400_ocean_with_audio.mkv' , {responseType: 'blob'})
    //     .then((res) => {console.log(res)}
    //         // axios.spread((...responses) => {
    //         //     console.log(responses);
    //         //     responses.map((res) => (
    //         //         console.log(URL.createObjectURL(res.data))
    //         //     ))
    //         // })
    //     )
    // )
    // console.log('getFileFromLink()', getFileFromLink(REACT_APP_API_BASE_URL + '/get/file/axis-point-media/sample_960x400_ocean_with_audio.mkv'));
    // var reader = new FileReader();
    // reader.readAsDataURL(file);
    // const url = typedArrayToURL(getFileFromLink(REACT_APP_API_BASE_URL + '/get/file/axis-point-media/sample_960x400_ocean_with_audio.mkv'), 'video/mkv');
    return ( 
        // <video width="320" height="240" controls src={REACT_APP_API_BASE_URL + '/get/file/axis-point-media/sample_960x400_ocean_with_audio.mkv'}>
        <>
        {/* <video>
            <source src={REACT_APP_API_BASE_URL + '/get/file/axis-point-media/sample_960x400_ocean_with_audio.mkv'} type="video/mp4"/>
        </video> */}
        {/* <VideoJS options={videoJsOptions} onReady={handlePlayerReady} /> */}
        {
        files.map((file, index) => {
            return (
                // blobUrls[index] ? 
                <div className="mb-3">
                    <div style={{backgroundColor: 'red'}}><span style={{color:'white'}}>{file}</span></div>
                    <div style={{backgroundColor: 'blue'}}><span style={{color:'white'}}>{types[index]}</span></div>
                    {/* <div style={{backgroundColor: 'green'}}><span style={{color:'white'}}>{blobUrls[index]}</span></div> */}
                    <VideoJS key={index} options={
                        {
                        autoplay: false,
                        controls: true,
                        responsive: true,
                        fluid: true,
                        sources: [{
                        src: REACT_APP_API_BASE_URL + '/get/file/axis-point-media/'+file,
                        // type: types[index]
                        type: 'video/mp4'
                        }],
                        // sources: [{
                        //     src: blobUrls[index],
                        //     type: types[index]
                        //     // type: 'video/mp4'
                        // }],
                        }
                    } onReady={handlePlayerReady} />
                </div>
                // : null
            )
        })
        }
        </>
        // <video
        //     id="vid1"
        //     class="video-js vjs-default-skin"
        //     controls
        //     autoplay
        //     width="640" height="264"
        //     data-setup='{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/watch?v=xjS6SftYQaQ"}] }'
        // >
        // </video>
     );
}

export default Video;