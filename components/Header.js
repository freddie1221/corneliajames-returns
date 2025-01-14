import Image from 'next/image';
import logo from '@/public/logo.png';

export default function Header() {
  return (
    <header className="p-6 flex flex-col justify-center items-center gap-4">
      <Image src={logo} alt="Cornelia James" width={300} height={100} />
      <h1 className="heading-primary">Returns & Store Credit</h1>
    </header>
  );
}