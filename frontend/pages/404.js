import Link from 'next/link';

function Custom404() {
	return <>
        <section className='pagenotfound'>
            <h1>4<span>0</span>4</h1>
            <h2>Page Not Found</h2>
            <div className='text-center mt-3'>
                <Link href='/' className='btn btn-secondary btn-wh-220-46 btn-rounded'>
                    Navigation Back Home
                </Link>
            </div>
        </section>      
    </>;
}

export default Custom404
