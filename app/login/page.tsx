import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { PageBanner } from '@/components/PageBanner';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
	return (
		<div className='min-h-screen'>
			<Navbar />
			<div className='pt-20'>
				<PageBanner
					title='Login'
					subtitle='Sign in to your Wanderlust account'
				/>

				<section className='py-24 bg-background'>
					<div className='container mx-auto px-4 max-w-md'>
						<div className='bg-card rounded-2xl shadow-elevated p-8'>
							<div className='text-center mb-8'>
								<div className='w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center mx-auto mb-4'>
									<User className='w-8 h-8 text-primary-foreground' />
								</div>
								<h2 className='font-display text-2xl font-bold text-foreground'>
									Welcome Back
								</h2>
								<p className='font-body text-sm text-muted-foreground mt-2'>
									Login feature coming soon
								</p>
							</div>

							<div className='space-y-4'>
								<Button variant='coral' size='lg' className='w-full' disabled>
									Sign In (Coming Soon)
								</Button>
								<p className='text-center font-body text-sm text-muted-foreground'>
									Don't have an account?{' '}
									<span className='text-primary font-medium'>
										Sign up coming soon
									</span>
								</p>
							</div>

							<div className='mt-8 text-center'>
								<Button variant='outline' asChild>
									<Link to='/'>Back to Home</Link>
								</Button>
							</div>
						</div>
					</div>
				</section>
			</div>
			<Footer />
		</div>
	);
};

export default Login;
