import Image from 'next/image';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import AddressImage from '@/public/home/address.png';
import Logo from '@/public/root/Logo-footer.png';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Address() {
	const { t } = useTranslation('common');
	return (
		<div className='bg-white sec-com'>
			<div className='container-lg'>
				<h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12'>
					{t('addressBarber')}
				</h2>

				{/* Address Image Card */}
				<div className='max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto mb-8 md:mb-12'>
					<div className='relative w-full h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden'>
						<Image src={AddressImage} alt='Barber shop interior' layout='fill'
							   className='object-contain rounded-3xl'/>
					</div>
					<p className='text-black text-sm md:text-base lg:text-lg px-4 text-center font-bold'>
						<br></br>
						Toà nhà Clubhouse, Khu K5-5, Khu đô thị Công nghệ FPT, Phường Hoà Hải, Quận Ngũ Hành Sơn, Thành phố Đà Nẵng.
					</p>


				</div>

				{/* Social Links */}
				<div className='flex justify-center gap-6 md:gap-8 mb-8 md:mb-12'>
					<Link href='https://instagram.com' className='text-black hover:text-[#F5A524] transition-colors'>
						<Instagram className='w-5 h-5 md:w-6 md:h-6' />
						<span className='sr-only'>Instagram</span>
					</Link>
					<Link href='https://facebook.com' className='text-black hover:text-[#F5A524] transition-colors'>
						<Facebook className='w-5 h-5 md:w-6 md:h-6' />
						<span className='sr-only'>Facebook</span>
					</Link>
					{/*<Link href='#' className='text-black hover:text-[#F5A524] transition-colors'>*/}
					{/*	<Twitter className='w-5 h-5 md:w-6 md:h-6' />*/}
					{/*	<span className='sr-only'>Twitter</span>*/}
					{/*</Link>*/}
				</div>

				{/* Logo */}
				<Link href='/'>
					<div className='flex justify-center'>
						<div className='relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32'>
							<Image src={Logo} alt='Barber Shop Logo' fill className='object-contain'/>
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
}
