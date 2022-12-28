import Link from "next/link";

export default function Custom500(){
    return <>
        <section className='pagenotfound'>
            <h1>5<span>0</span>0</h1>
            <h2>Opps, Something went wrong</h2>
            <div className='text-center mt-3'>
                <Link href='/' className='btn btn-secondary btn-wh-220-46 btn-rounded'>
                    Navigation Back Home
                </Link>
            </div>
        </section>      
    </>;
}