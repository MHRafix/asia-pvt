import heroImage from '@/assets/hero-beach.jpg';
import { Button } from '@/components/ui/button';
import { countries, visaTypes } from '@/data/countries';
import { destinations } from '@/data/packages';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateSelector } from './home/DateSelector';
import { DestinationSelector } from './home/DestinationSelector';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';

type SearchTab = 'packages' | 'visa';

export function HeroSection() {
	const [activeTab, setActiveTab] = useState<SearchTab>('packages');
	const [selectedDestination, setSelectedDestination] = useState('');
	const [destinationSearch, setDestinationSearch] = useState('');
	const [showDestDropdown, setShowDestDropdown] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState('');
	const [countrySearch, setCountrySearch] = useState('');
	const [showCountryDropdown, setShowCountryDropdown] = useState(false);
	const [selectedVisaType, setSelectedVisaType] = useState('');
	const [travelDate, setTravelDate] = useState('');
	const navigate = useNavigate();

	const filteredDestinations = destinations.filter((d) =>
		d.label.toLowerCase().includes(destinationSearch.toLowerCase()),
	);

	const filteredCountries = countries.filter((c) =>
		c.name.toLowerCase().includes(countrySearch.toLowerCase()),
	);

	const handlePackageSearch = () => {
		if (selectedDestination) {
			navigate(`/packages/${selectedDestination}`);
		} else {
			navigate('/packages');
		}
	};

	const handleVisaSearch = () => {
		if (selectedCountry) {
			// const country = countries.find((c) => c.name === selectedCountry);
			navigate(`/visa/${selectedCountry}?type=${selectedVisaType}`);
		} else {
			navigate('/visa');
		}
	};

	return (
		<section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
			<div className='absolute inset-0'>
				<img
					src={heroImage}
					alt='Tropical paradise beach'
					className='w-full h-full object-cover'
				/>
				<div className='absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent' />
			</div>

			<div className='container mx-auto px-4 relative z-10 pt-20'>
				<div className='max-w-3xl'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<span className='inline-block px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm text-primary-foreground font-body text-sm font-medium mb-6'>
							✈️ Your Journey Begins Here
						</span>
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.1 }}
						className='font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-tight mb-6'
					>
						Discover the World's
						<span className='block text-primary'>Hidden Paradise</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className='font-body text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl'
					>
						Explore breathtaking destinations, create unforgettable memories,
						and let us handle every detail of your perfect vacation.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.3 }}
						className='flex flex-wrap gap-4'
					>
						<Button
							variant='hero'
							size='xl'
							onClick={() => navigate('/packages')}
						>
							Explore Packages
							<ArrowRight className='w-5 h-5' />
						</Button>
						<Button
							variant='heroOutline'
							size='xl'
							onClick={() => navigate('/appointment')}
						>
							Plan Your Trip
						</Button>
					</motion.div>
				</div>

				{/* Tabbed Search Bar */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.5 }}
					className='mt-16 max-w-4xl'
				>
					<div className='bg-card/95 backdrop-blur-lg rounded-2xl shadow-elevated overflow-hidden'>
						{/* Tabs */}
						<div className='flex border-b border-border'>
							<button
								onClick={() => setActiveTab('packages')}
								className={`flex-1 px-6 py-4 font-body text-sm font-medium transition-colors ${
									activeTab === 'packages'
										? 'text-primary border-b-2 border-primary bg-primary/5'
										: 'text-muted-foreground hover:text-foreground'
								}`}
							>
								🌍 Tour Package Search
							</button>
							<button
								onClick={() => setActiveTab('visa')}
								className={`flex-1 px-6 py-4 font-body text-sm font-medium transition-colors ${
									activeTab === 'visa'
										? 'text-primary border-b-2 border-primary bg-primary/5'
										: 'text-muted-foreground hover:text-foreground'
								}`}
							>
								📋 Visa Requirements
							</button>
						</div>

						<div className='p-4'>
							{activeTab === 'packages' ? (
								<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
									{/* Destination searchable select */}
									<div className='relative'>
										<div className='flex items-center gap-3 px-4 py-3 rounded-xl bg-muted'>
											<MapPin className='w-5 h-5 text-primary flex-shrink-0' />
											<div className='flex-1 min-w-0'>
												<p className='text-xs text-muted-foreground font-body'>
													Destination
												</p>
												<DestinationSelector
													destination={selectedDestination}
													setDestination={setSelectedDestination}
												/>
											</div>
										</div>
									</div>

									{/* Travel Date */}
									<div className='flex items-center gap-3 px-4 py-3 rounded-xl bg-muted'>
										<Calendar className='w-5 h-5 text-primary flex-shrink-0' />
										<div className='flex-1'>
											<p className='text-xs text-muted-foreground font-body'>
												Travel Date
											</p>
											<DateSelector />
										</div>
									</div>

									<Button
										variant='coral'
										className='h-full'
										onClick={handlePackageSearch}
									>
										<Search className='w-4 h-4' />
										Search
									</Button>
								</div>
							) : (
								<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
									{/* Country searchable select */}
									<div className='relative'>
										<div className='flex items-center gap-3 px-4 py-3 rounded-xl bg-muted'>
											<MapPin className='w-5 h-5 text-ocean flex-shrink-0' />
											<div className='flex-1 min-w-0'>
												<p className='text-xs text-muted-foreground font-body'>
													Country
												</p>
												<DestinationSelector
													destination={selectedCountry}
													setDestination={setSelectedCountry}
												/>
											</div>
										</div>
									</div>

									{/* Visa Type select */}
									<div className='flex items-center gap-3 px-4 py-3 rounded-xl bg-muted'>
										<Search className='w-5 h-5 text-ocean flex-shrink-0' />
										<div className='flex-1'>
											<p className='text-sm text-muted-foreground font-body'>
												Visa Type
											</p>
											<Select onValueChange={setSelectedVisaType}>
												<SelectTrigger className='w-full max-w-40'>
													<SelectValue placeholder='Visa Types' />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														{visaTypes.map((vt) => (
															<SelectItem key={vt?.value} value={vt?.value}>
																{vt?.label}
															</SelectItem>
														))}
													</SelectGroup>
												</SelectContent>
											</Select>
										</div>
									</div>

									<Button
										variant='ocean'
										className='h-full'
										onClick={handleVisaSearch}
									>
										<Search className='w-4 h-4' />
										Check Requirements
									</Button>
								</div>
							)}
						</div>
					</div>
				</motion.div>
			</div>

			{/* Click outside to close dropdowns */}
			{(showDestDropdown || showCountryDropdown) && (
				<div
					className='fixed inset-0 z-40'
					onClick={() => {
						setShowDestDropdown(false);
						setShowCountryDropdown(false);
					}}
				/>
			)}
		</section>
	);
}
