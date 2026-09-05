import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Layout from './layouts/Layout'
import Home from './pages/Home'
import About from './pages/About'
import OkayToBoard from './pages/OkayToBoard'
import Dashboard from './pages/admin/Dashboard'
import AgentDirectory from './pages/admin/AgentDirectory'
import CustomerList from './pages/admin/CustomerList'
import GlobalVisaCatalog from './pages/admin/GlobalVisaCatalog'
import PlatformIntegrationSettings from './pages/admin/PlatformIntegrationSettings'
import ClientPartnerFeedback from './pages/admin/ClientPartnerFeedback'
import SupportHelpdeskQueue from './pages/admin/Support'
import OTBPricingTariffs from './pages/admin/OTBpricing'
import AirlineDirectory from './pages/admin/Airline'
import CountriesDirectory from './pages/admin/GlobalCountries'
import AirportDirectory from './pages/admin/AirportDirectory'
import MyBookings, { MyBookingsContent } from "./pages/user/Mybookings";
import WalletHistory from "./pages/user/Wallethistory";
import VisaHistory from "./pages/user/AppliedVisaHistory";
import OTBHistory from "./pages/user/Appliedotbhistory";
import Profile from "./pages/user/Myprofile";
import SignIn from "./pages/Signin"
import SignUp from "./pages/Signup"
import Visa from './pages/Visa'
import Flight from './pages/Flights'

function App() {
  const [count, setCount] = useState(0)
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
   <div>
  <Routes>

    {/* Layout Parent */}
    <Route path="/" element={<Layout />}>

      {/* / */}
      <Route index element={<Home />} />

      {/* Auth */}
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
   
      {/* Public Pages */}
      <Route path="about" element={<About />} />
      <Route path="okay-to-board" element={<OkayToBoard />} />
      <Route path="flight" element={<Flight />} />
      <Route path="visa" element={<Visa />} />
    </Route>

    {/* Admin / Dashboard Routes */}
    <Route
      path="/dashboard"
      element={
        <Dashboard
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
      }
    />

    <Route
      path="/admin/global-visa-catalog"
      element={<GlobalVisaCatalog />}
    />

    <Route
      path="/admin/AgentDirectory"
      element={<AgentDirectory />}
    />

    <Route
      path="/admin/list"
      element={<CustomerList />}
    />

    <Route
      path="/admin/visa"
      element={<GlobalVisaCatalog />}
    />

    <Route
      path="/admin/platform-settings"
      element={<PlatformIntegrationSettings />}
    />

    <Route
      path="/admin/feedback"
      element={<ClientPartnerFeedback />}
    />

    <Route
      path="/admin/support"
      element={<SupportHelpdeskQueue />}
    />

    <Route
      path="/admin/pricing"
      element={<OTBPricingTariffs />}
    />

    <Route
      path="/admin/airline"
      element={<AirlineDirectory />}
    />

    <Route
      path="/admin/countries"
      element={<CountriesDirectory />}
    />

    <Route
      path="/admin/airport"
      element={<AirportDirectory />}
    />
 <Route path="/user-dashboard" element={<MyBookings />}>
  <Route index element={<MyBookingsContent />} />
  <Route path="wallet-history" element={<WalletHistory />} />
          <Route path="visa-history" element={<VisaHistory />} />
          <Route path="otb-history" element={<OTBHistory />} />
          <Route path="profile" element={<Profile />} />
 </Route>
  </Routes>
</div>
  )
}

export default App