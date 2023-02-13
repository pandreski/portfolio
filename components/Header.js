import Image from 'next/image';
import logo from '@/public/logo.svg';
import Link from 'next/link';
import gbFlag from '@/public/gb.svg';
import Cta from './Cta';

export default function Header() {
  return (
    <header className='container mx-auto px-5'>
      <div className='flex justify-between py-5'>
        <Link href='/'>
          <Image src={logo} alt='Pierre Andreski' />
        </Link>
        <div className='flex items-center'>
          <Link href='/' className='mr-4 md:mr-8'>
            <Image src={gbFlag} alt='English version' className='rounded-full w-6' />
          </Link>
          <Cta href='/'>Voir mon CV</Cta>
        </div>
      </div>
    </header>
  );
}
