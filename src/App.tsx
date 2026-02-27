import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Appointment from './pages/Appointment';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Index from './pages/Index';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import PackageDetail from './pages/PackageDetail';
import Packages from './pages/Packages';
import ServiceDetail from './pages/ServiceDetail';
import Visa from './pages/Visa';
import VisaCountry from './pages/VisaCountry';

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			{/* <Toaster />
			<Sonner /> */}
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Index />} />
					<Route path='/packages' element={<Packages />} />
					<Route path='/packages/:id' element={<PackageDetail />} />
					<Route path='/visa' element={<Visa />} />
					<Route path='/visa/:slug' element={<VisaCountry />} />
					<Route path='/appointment' element={<Appointment />} />
					<Route path='/services/:slug' element={<ServiceDetail />} />
					<Route path='/blog' element={<Blog />} />
					<Route path='/blog/:id' element={<BlogPost />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/login' element={<Login />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
