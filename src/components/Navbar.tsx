import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Plane, User, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
	{ name: 'Home', href: '/' },
	{ name: 'Packages', href: '/packages' },
	{ name: 'Visa Services', href: '/visa' },
	{ name: 'Book Appointment', href: '/appointment' },
	{ name: 'Blog', href: '/blog' },
	{ name: 'Contact', href: '/contact' },
];

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<nav className='fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border'>
			<div className='container mx-auto px-4'>
				<div className='flex items-center justify-between h-20'>
					<Link to='/' className='flex items-center gap-2'>
						<div className='w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center'>
							<Plane className='w-5 h-5 text-primary-foreground' />
						</div>
						<span className='font-display text-2xl font-semibold text-foreground'>
							Asia Tours
						</span>
					</Link>

					<div className='hidden lg:flex items-center gap-8'>
						{navLinks.map((link) => (
							<Link
								key={link.href}
								to={link.href}
								className={`font-body text-sm font-medium transition-colors hover:text-primary ${
									location.pathname === link.href
										? 'text-primary'
										: 'text-muted-foreground'
								}`}
							>
								{link.name}
							</Link>
						))}
					</div>

					<div className='hidden lg:flex items-center gap-3'>
						<Button
							variant='ghost'
							size='sm'
							onClick={() => navigate('/login')}
						>
							<User className='w-4 h-4' />
							Login
						</Button>
						<Button
							variant='coral'
							size='lg'
							onClick={() => navigate('/appointment')}
						>
							Book Now
						</Button>
					</div>

					<button
						className='lg:hidden p-2'
						onClick={() => setIsOpen(!isOpen)}
						aria-label='Toggle menu'
					>
						{isOpen ? (
							<X className='w-6 h-6 text-foreground' />
						) : (
							<Menu className='w-6 h-6 text-foreground' />
						)}
					</button>
				</div>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						className='lg:hidden bg-card border-t border-border'
					>
						<div className='container mx-auto px-4 py-6 space-y-4'>
							{navLinks.map((link) => (
								<Link
									key={link.href}
									to={link.href}
									onClick={() => setIsOpen(false)}
									className={`block font-body text-base font-medium transition-colors hover:text-primary ${
										location.pathname === link.href
											? 'text-primary'
											: 'text-muted-foreground'
									}`}
								>
									{link.name}
								</Link>
							))}
							<div className='flex flex-col gap-3 pt-4'>
								<Button
									variant='ghost'
									onClick={() => {
										navigate('/login');
										setIsOpen(false);
									}}
								>
									<User className='w-4 h-4' />
									Login
								</Button>
								<Button
									variant='coral'
									className='w-full'
									onClick={() => {
										navigate('/appointment');
										setIsOpen(false);
									}}
								>
									Book Now
								</Button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
}
