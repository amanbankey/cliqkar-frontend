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

function App() {
  const [count, setCount] = useState(0)
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
      <div>
        <Routes>
           <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="okay-to-board" element={<OkayToBoard />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard  setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>} />
          <Route path="/admin/global-visa-catalog" element={ <GlobalVisaCatalog /> } />
          <Route path="/admin/AgentDirectory" element={<AgentDirectory/>} />
         < Route path="/admin/list" element={<CustomerList/>} />
         < Route path="/admin/visa" element={<GlobalVisaCatalog/>} />
        <Route path="/admin/platform-settings" element={<PlatformIntegrationSettings  />} />
        <Route path="/admin/feedback" element={<ClientPartnerFeedback  />} />
        <Route path="/admin/support" element={<SupportHelpdeskQueue  />} />
        <Route path="/admin/pricing" element={<OTBPricingTariffs  />} />
        <Route path="/admin/airline" element={<AirlineDirectory  />} />
        <Route path="/admin/countries" element={<CountriesDirectory  />} />
        <Route path="/admin/airport" element={<AirportDirectory  />} />

        </Routes>
    </div>
  )
}

export default App