import { useRouter } from 'next/router'
import { useEffect } from 'react';

function Index() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/')
      .then(router.push({
        pathname: '/',
        hash: 'projects',
      }, undefined, { scroll: false }))
  }, []);

  return (
    <div className='container pb-14 px-5 mx-auto'>
      Redirecting...
    </div>
  );
}

export default Index;