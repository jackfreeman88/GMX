import Link from 'next/link';

function VerificationPending() {
	return (
        <>
			<section className='pagenotfound'>
				<div className='text-center mt-3'>
					<h2>Admin verification pending, Contact GMX 
					<Link href="/contact-us"> support </Link>
					for any query.</h2>
				</div>
			</section>      
        </>
    )
}

export default VerificationPending