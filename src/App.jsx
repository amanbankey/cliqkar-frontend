import { useState } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import OkayToBoard from "./pages/OkayToBoard";
import Contact from "./pages/Contact";
import Visa from "./pages/Visa";
import Flight from "./pages/Flights";

import Dashboard from "./pages/admin/Dashboard";
import AgentDirectory from "./pages/admin/AgentDirectory";
import CustomerList from "./pages/admin/CustomerList";
import GlobalVisaCatalog from "./pages/admin/GlobalVisaCatalog";
import PlatformIntegrationSettings from "./pages/admin/PlatformIntegrationSettings";
import ClientPartnerFeedback from "./pages/admin/ClientPartnerFeedback";
import SupportHelpdeskQueue from "./pages/admin/Support";
import OTBPricingTariffs from "./pages/admin/OTBpricing";
import AirlineDirectory from "./pages/admin/Airline";
import CountriesDirectory from "./pages/admin/GlobalCountries";
import AirportDirectory from "./pages/admin/AirportDirectory";
import AdminLogin from "./pages/admin/AdminLogin";

import MyBookings, {
  MyBookingsContent,
} from "./pages/user/Mybookings";

import WalletHistory from "./pages/user/Wallethistory";
import VisaHistory from "./pages/user/AppliedVisaHistory";
import OTBHistory from "./pages/user/Appliedotbhistory";
import Profile from "./pages/user/Myprofile";

import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";

import TravelerDetails from "./components/Visa/TravelerDetails";
import ProtectedRoute from "./components/protectedRoute";

import ScrollToTop from "./components/ScrollToTop";
import AgentSignupPage from "./pages/agent/AgentSignup";
import AgentSigninPage from "./pages/agent/AgentSignin";
import AgentDashboard from "./pages/agent/AgentDashboard";
import AgentProfile from "./pages/agent/AgentProfile";
import AgentBookings from "./pages/agent/AgentBookings";
import AgentWalletHistory from "./pages/agent/AgentWalletHistory";
import AgentVisaHistory from "./pages/agent/AgentVisaHistory";
import AgentOTBHistory from "./pages/agent/AgentOTBHistory";


import VisaPayment from "./pages/VisaPayment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <ScrollToTop />

      <Routes>

        {/* =========================================================
            MAIN WEBSITE LAYOUT
            Navbar + Outlet + Footer
        ========================================================= */}
        <Route path="/" element={<Layout />}>

          {/* HOME */}
          <Route index element={<Home />} />

          {/* AUTH */}
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />

          {/* PUBLIC PAGES */}
          <Route path="about" element={<About />} />

          <Route path="contact" element={<Contact />} />

          <Route
            path="okay-to-board"
            element={<OkayToBoard />}
          />

          <Route
            path="flight"
            element={<Flight />}
          />

          <Route
            path="visa"
            element={<Visa />}
          />

          <Route
            path="traveler-details"
            element={<TravelerDetails />}
          />
 <Route
  path="/visa-payment"
  element={<VisaPayment />}
/>
<Route
  path="/payment-success"
  element={<PaymentSuccess />}
/>

<Route
  path="/payment-failure"
  element={<PaymentFailure />}
/>

          {/* =======================================================
              USER DASHBOARD

              IMPORTANT:
              This is INSIDE Layout.

              Therefore:
              Navbar
                  ↓
              User Dashboard
                  ↓
              Footer

              will remain on the SAME PAGE.
          ======================================================= */}

          <Route
            path="user-dashboard"
            element={<MyBookings />}
          >

            {/* /user-dashboard */}
            <Route
              index
              element={<MyBookingsContent />}
            />

            {/* /user-dashboard/profile */}
            <Route
              path="profile"
              element={<Profile />}
            />

            {/* /user-dashboard/wallet-history */}
            <Route
              path="wallet-history"
              element={<WalletHistory />}
            />

            {/* /user-dashboard/visa-history */}
            <Route
              path="visa-history"
              element={<VisaHistory />}
            />

            {/* /user-dashboard/otb-history */}
            <Route
              path="otb-history"
              element={<OTBHistory />}
            />

          </Route>
{/* =======================================================
              AGENT DASHBOARD

              Same idea as USER DASHBOARD above: this stays INSIDE
              Layout, so Navbar + Agent Dashboard + Footer render
              together on one page.
          ======================================================= */}

          <Route
            path="agent-dashboard"
            element={<AgentDashboard />}
          >

            {/* /agent-dashboard */}
            <Route
              index
              element={<AgentBookings />}
            />

            {/* /agent-dashboard/profile */}
            <Route
              path="profile"
              element={<AgentProfile />}
            />

            {/* /agent-dashboard/wallet-history */}
            <Route
              path="wallet-history"
              element={<AgentWalletHistory />}
            />

            {/* /agent-dashboard/visa-history */}
            <Route
              path="visa-history"
              element={<AgentVisaHistory />}
            />

            {/* /agent-dashboard/otb-history */}
            <Route
              path="otb-history"
              element={<AgentOTBHistory />}
            />

          </Route>

        </Route>


        {/* =========================================================
            ADMIN DASHBOARD
        ========================================================= */}

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


        {/* =========================================================
            ADMIN LOGIN
        ========================================================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* =========================================================
            PROTECTED ADMIN ROUTES
        ========================================================= */}

        <Route element={<ProtectedRoute />} />
<Route
  path="/agent/signup"
  element={<AgentSignupPage />}
/>

<Route
  path="/agent/signin"
  element={<AgentSigninPage />}
/>
      </Routes>
    </>
  );
}

export default App;