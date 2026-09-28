import React, { useMemo, useState } from "react";
import {
  X,
  Plane,
  ArrowLeft,
  User,
  UserPlus,
  Globe2,
  CalendarDays,
  MapPin,
  Users,
  VenusAndMars,
  FileText,
  LogIn,
  LogOut,
  CreditCard,
  BriefcaseBusiness,
  CheckCircle2,
  UploadCloud,
  ShieldCheck,
  Clock3,
  Ban,
  WalletCards,
  Hotel,
  Camera,
  HeartPulse,
  ChevronRight,
  Trash2,
  LockKeyhole,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  extractPassportData,
  extractPanData,
} from "../../api/documentApi";
import {
  submitVisaApplication,
} from "../../api/visaApplicationApi";

import { initiatePayment } from "../../api/paymentApi";

import { getMe } from "../../api/authApi";

/* =========================================================
   HELPERS
========================================================= */

const isAllowed = (countryConfig, field) => {
  if (!countryConfig) {
    return true;
  }

  return (
    String(countryConfig?.[field] ?? "Yes")
      .trim()
      .toLowerCase() === "yes"
  );
};


const isRequired = (countryConfig, field) => {
  if (!countryConfig) {
    return false;
  }

  return (
    String(countryConfig?.[field] ?? "No")
      .trim()
      .toLowerCase() === "yes"
  );
};


/* =========================================================
   INITIAL TRAVELER
========================================================= */

const createTraveler = (travelDate = "") => ({
  id: Date.now() + Math.random(),

  firstName: "",
  lastName: "",
  passportNumber: "",
  nationality: "",
  passengerType: "Adult",
  sex: "",
  dateOfBirth: "",
  placeOfBirth: "",
  spouseName: "",
  motherName: "",
  fatherName: "",
  travelDate: travelDate || "",
  panNumber: "",
  occupation: "",
  checkinPoint: "",
  checkoutPoint: "",

  files: {
    travelerPhoto: null,
    passportFront: null,
    passportBack: null,
    panCard: null,
    hotelVoucher: null,
    additionalFolder: null,
  },
});


/* =========================================================
   MAIN COMPONENT
========================================================= */

const TravelerDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* =====================================================
     DOCUMENT READING STATES
  ===================================================== */

  const [readingPassport, setReadingPassport] = useState({});
  const [readingPan, setReadingPan] = useState({});


  const {
    visa = null,
    goingFrom = "",
    goingTo = "",
    countryConfig = null,
    travelDate = "",
    returnDate = "",
  } = location.state || {};


  /* =====================================================
     TRAVELERS
  ===================================================== */

  const [travelers, setTravelers] = useState([
    createTraveler(travelDate),
  ]);


  /* =====================================================
     PASSPORT UPLOAD + AUTO FILL
  ===================================================== */

  const handlePassportUpload = async (travelerId, file) => {
  if (!file) return;

  try {
    setReadingPassport((prev) => ({
      ...prev,
      [travelerId]: true,
    }));

    // Show uploaded file immediately
    updateFile(travelerId, "passportFront", file);

    const response = await extractPassportData(file);

    console.log("Passport OCR API response:", response);

    // Handle common Axios + sendSuccess response structures
    const candidates = [
      response?.data?.data?.data,
      response?.data?.data,
      response?.data,
      response,
    ];

    const extracted =
      candidates.find(
        (item) =>
          item &&
          typeof item === "object" &&
          (
            item.passportNumber ||
            item.firstName ||
            item.lastName ||
            item.dateOfBirth
          )
      ) || {};

    console.log("Passport extracted fields:", extracted);

    const passportNumber = String(
      extracted.passportNumber || ""
    )
      .trim()
      .toUpperCase();

    const firstName = String(extracted.firstName || "")
      .replace(/\s+/g, " ")
      .trim();

    const lastName = String(extracted.lastName || "")
      .replace(/\s+/g, " ")
      .trim();

    const nationality = String(extracted.nationality || "")
      .trim()
      .toUpperCase();

    const sex = String(extracted.sex || "").trim();

    const dateOfBirth = String(
      extracted.dateOfBirth || ""
    ).trim();

    const placeOfBirth = String(
      extracted.placeOfBirth || ""
    ).trim();

    // Validate passport number format before autofilling
    const validPassportNumber =
      /^[A-Z0-9]{6,12}$/.test(passportNumber);

    // Validate ISO date format
    const validDateOfBirth =
      /^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth) &&
      !Number.isNaN(Date.parse(`${dateOfBirth}T00:00:00`));

    const validSex = ["Male", "Female"].includes(sex);

    const hasValidData =
      validPassportNumber ||
      firstName ||
      lastName ||
      nationality ||
      validDateOfBirth ||
      validSex;

    if (!hasValidData) {
      alert(
        "Passport details could not be verified. Please upload a clear passport biodata page or enter details manually."
      );
      return;
    }

    // Update all extracted fields together to avoid stale state updates.
    setTravelers((prev) =>
      prev.map((traveler) => {
        if (traveler.id !== travelerId) return traveler;

        return {
          ...traveler,

          ...(firstName ? { firstName } : {}),
          ...(lastName ? { lastName } : {}),
          ...(validPassportNumber
            ? { passportNumber }
            : {}),
          ...(nationality ? { nationality } : {}),
          ...(validSex ? { sex } : {}),
          ...(validDateOfBirth
            ? { dateOfBirth }
            : {}),
          ...(placeOfBirth ? { placeOfBirth } : {}),
        };
      })
    );

    alert(
      "Passport scan completed. Please verify the extracted details before continuing."
    );
  } catch (error) {
    console.error("Passport extraction failed:", error);

    alert(
      error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to read passport. Please upload a clear passport biodata page or enter details manually."
    );
  } finally {
    setReadingPassport((prev) => ({
      ...prev,
      [travelerId]: false,
    }));
  }
};

  /* =====================================================
     PAN UPLOAD + AUTO FILL
  ===================================================== */

const handlePanUpload = async (travelerId, file) => {
  if (!file) return;

  try {
    setReadingPan((prev) => ({
      ...prev,
      [travelerId]: true,
    }));

    // Show uploaded file immediately
    updateFile(travelerId, "panCard", file);

    const response = await extractPanData(file);

    console.log("PAN OCR API response:", response);

    // Handle common Axios + sendSuccess response structures
    const candidates = [
      response?.data?.data?.data,
      response?.data?.data,
      response?.data,
      response,
    ];

    const extracted =
      candidates.find(
        (item) =>
          item &&
          typeof item === "object" &&
          (
            item.panNumber ||
            item.name ||
            item.dateOfBirth
          )
      ) || {};

    console.log("PAN extracted fields:", extracted);

    const panNumber = String(extracted.panNumber || "")
      .trim()
      .toUpperCase();

    const panName = String(extracted.name || "")
      .replace(/\s+/g, " ")
      .trim();

    const dateOfBirth = String(
      extracted.dateOfBirth || ""
    ).trim();

    // PAN format: 5 letters + 4 digits + 1 letter
    const validPanNumber =
      /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(panNumber);

    // Validate ISO date
    const validDateOfBirth =
      /^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth) &&
      !Number.isNaN(Date.parse(`${dateOfBirth}T00:00:00`));

    if (!validPanNumber) {
      alert(
        "PAN number could not be verified. Please upload a clear PAN card image or enter the PAN number manually."
      );
      return;
    }

    // Split the extracted cardholder name into first and last name.
    // Keep the first word as firstName and remaining words as lastName.
    const nameParts = panName
      .split(/\s+/)
      .filter(Boolean);

    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ");

    setTravelers((prev) =>
      prev.map((traveler) => {
        if (traveler.id !== travelerId) return traveler;

        return {
          ...traveler,

          panNumber,

          // Only fill name if OCR returned a name.
          ...(firstName ? { firstName } : {}),
          ...(lastName ? { lastName } : {}),

          // Only fill DOB if OCR returned a valid date.
          ...(validDateOfBirth
            ? { dateOfBirth }
            : {}),
        };
      })
    );

    if (!panName || !validDateOfBirth) {
      alert(
        "PAN number was read. Name or date of birth could not be confidently read, so please verify or enter those fields manually."
      );
    } else {
      alert(
        "PAN scan completed. Please verify the extracted details before continuing."
      );
    }
  } catch (error) {
    console.error("PAN extraction failed:", error);

    alert(
      error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to read PAN card. Please upload a clear image or enter details manually."
    );
  } finally {
    setReadingPan((prev) => ({
      ...prev,
      [travelerId]: false,
    }));
  }
};  /* =====================================================
     INSURANCE
  ===================================================== */

  const [insurance, setInsurance] = useState(false);


  /* =====================================================
     PAYMENT
  ===================================================== */

  const [paymentMethod, setPaymentMethod] =
    useState("Online");

    const [paymentPhone, setPaymentPhone] = useState("");
const [paymentEmail, setPaymentEmail] = useState("");


  /* =====================================================
     VISA PRICE
  ===================================================== */

  const visaFeePerTraveler =
    Number(
      String(
        visa?.amount || "0"
      ).replace(/[^0-9.]/g, "")
    ) || 0;

  const insurancePerTraveler = 19;

  const visaTotal =
    travelers.length *
    visaFeePerTraveler;

  const insuranceTotal = insurance
    ? travelers.length *
      insurancePerTraveler
    : 0;

  const totalAmount =
    visaTotal +
    insuranceTotal;


  /* =====================================================
     COUNTRY CONFIG FLAGS
  ===================================================== */

  const showFirstName =
    isAllowed(
      countryConfig,
      "allowForFirstName"
    );

  const requiredFirstName =
    isRequired(
      countryConfig,
      "allowForFirstNameRequired"
    );


  const showLastName =
    isAllowed(
      countryConfig,
      "allowForLastName"
    );

  const requiredLastName =
    isRequired(
      countryConfig,
      "allowForLastNameRequired"
    );


  const showPassportNumber =
    isAllowed(
      countryConfig,
      "allowForPassportNumber"
    );

  const requiredPassportNumber =
    isRequired(
      countryConfig,
      "allowForPassportNumberRequired"
    );


  const showNationality =
    isAllowed(
      countryConfig,
      "allowForNationality"
    );

  const requiredNationality =
    isRequired(
      countryConfig,
      "allowForNationalityRequired"
    );


  const showGender =
    isAllowed(
      countryConfig,
      "allowForGender"
    );

  const requiredGender =
    isRequired(
      countryConfig,
      "allowForGenderRequired"
    );


  const showDob =
    isAllowed(
      countryConfig,
      "allowForDob"
    );

  const requiredDob =
    isRequired(
      countryConfig,
      "allowForDobRequired"
    );


  const showPlaceOfBirth =
    isAllowed(
      countryConfig,
      "allowForPlaceOfBirth"
    );

  const requiredPlaceOfBirth =
    isRequired(
      countryConfig,
      "allowForPlaceOfBirthRequired"
    );


  const showSpouseName =
    isAllowed(
      countryConfig,
      "allowForSpouseName"
    );

  const requiredSpouseName =
    isRequired(
      countryConfig,
      "allowForSpouseNameRequired"
    );


  const showMotherName =
    isAllowed(
      countryConfig,
      "allowForMotherName"
    );

  const requiredMotherName =
    isRequired(
      countryConfig,
      "allowForMotherNameRequired"
    );


  const showFatherName =
    isAllowed(
      countryConfig,
      "allowForFatherName"
    );

  const requiredFatherName =
    isRequired(
      countryConfig,
      "allowForFatherNameRequired"
    );


  const showTravelDate =
    isAllowed(
      countryConfig,
      "allowForTravelDate"
    );

  const requiredTravelDate =
    isRequired(
      countryConfig,
      "allowForTravelDateRequired"
    );


  const showPanCard =
    isAllowed(
      countryConfig,
      "allowForPanCard"
    );

  const requiredPanCard =
    isRequired(
      countryConfig,
      "allowForPanCardRequired"
    );


  const showPanNumber =
    isAllowed(
      countryConfig,
      "allowForPanCardNumber"
    );

  const requiredPanNumber =
    isRequired(
      countryConfig,
      "allowForPanCardNumberRequired"
    );


  const showOccupation =
    isAllowed(
      countryConfig,
      "allowForOccupation"
    );

  const requiredOccupation =
    isRequired(
      countryConfig,
      "allowForOccupationRequired"
    );


  const showPhoto =
    isAllowed(
      countryConfig,
      "allowForPhoto"
    );

  const requiredPhoto =
    isRequired(
      countryConfig,
      "allowForPhotoRequired"
    );


  const showPassportFront =
    isAllowed(
      countryConfig,
      "allowForPassportFront"
    );

  const requiredPassportFront =
    isRequired(
      countryConfig,
      "allowForPassportFrontRequired"
    );


  const showPassportBack =
    isAllowed(
      countryConfig,
      "allowForPassportBack"
    );

  const requiredPassportBack =
    isRequired(
      countryConfig,
      "allowForPassportBackRequired"
    );


  const showHotelName =
    isAllowed(
      countryConfig,
      "allowForHotelName"
    );

  const requiredHotelName =
    isRequired(
      countryConfig,
      "allowForHotelNameRequired"
    );


  const showHotelVoucher =
    isAllowed(
      countryConfig,
      "allowForHotelVoucher"
    );

  const requiredHotelVoucher =
    isRequired(
      countryConfig,
      "allowForHotelVoucherRequired"
    );


  const showCheckin =
    isAllowed(
      countryConfig,
      "allowForCheckinPoint"
    );

  const requiredCheckin =
    isRequired(
      countryConfig,
      "allowForCheckinPointRequired"
    );


  const showCheckout =
    isAllowed(
      countryConfig,
      "allowForCheckoutPoint"
    );

  const requiredCheckout =
    isRequired(
      countryConfig,
      "allowForCheckoutPointRequired"
    );


  const showAdditionalFolder =
    isAllowed(
      countryConfig,
      "allowForAdditionalFolder"
    );

  const requiredAdditionalFolder =
    isRequired(
      countryConfig,
      "allowForAdditionalFolderRequired"
    );


  const additionalFolderLabel =
    countryConfig?.allowForAdditionalFolderLabel?.trim() ||
    "Additional Document";


  const showInsurance =
    isAllowed(
      countryConfig,
      "allowForInsurance"
    );

  const requiredInsurance =
    isRequired(
      countryConfig,
      "allowForInsuranceRequired"
    );


  /* =====================================================
     TRAVELER FUNCTIONS
  ===================================================== */

  const addTraveler = () => {
    setTravelers((prev) => [
      ...prev,
      createTraveler(travelDate),
    ]);
  };


  const removeTraveler = (id) => {
    if (travelers.length === 1) {
      return;
    }

    setTravelers((prev) =>
      prev.filter(
        (traveler) =>
          traveler.id !== id
      )
    );
  };


  const updateTraveler = (
    id,
    field,
    value
  ) => {
    setTravelers((prev) =>
      prev.map((traveler) =>
        traveler.id === id
          ? {
              ...traveler,
              [field]: value,
            }
          : traveler
      )
    );
  };


  const updateFile = (
    id,
    field,
    file
  ) => {
    if (!file) {
      return;
    }

    setTravelers((prev) =>
      prev.map((traveler) =>
        traveler.id === id
          ? {
              ...traveler,
              files: {
                ...traveler.files,
                [field]: file,
              },
            }
          : traveler
      )
    );
  };


  const removeFile = (
    id,
    field
  ) => {
    setTravelers((prev) =>
      prev.map((traveler) =>
        traveler.id === id
          ? {
              ...traveler,
              files: {
                ...traveler.files,
                [field]: null,
              },
            }
          : traveler
      )
    );
  };


  /* =====================================================
     VALIDATION
  ===================================================== */

  const validateTravelers = () => {
    for (
      let i = 0;
      i < travelers.length;
      i++
    ) {
      const traveler =
        travelers[i];

      const number = i + 1;


      if (
        showFirstName &&
        requiredFirstName &&
        !traveler.firstName.trim()
      ) {
        alert(
          `Please enter first name for Traveler ${number}`
        );
        return false;
      }


      if (
        showLastName &&
        requiredLastName &&
        !traveler.lastName.trim()
      ) {
        alert(
          `Please enter last name for Traveler ${number}`
        );
        return false;
      }


      if (
        showPassportNumber &&
        requiredPassportNumber &&
        !traveler.passportNumber.trim()
      ) {
        alert(
          `Please enter passport number for Traveler ${number}`
        );
        return false;
      }


      if (
        showNationality &&
        requiredNationality &&
        !traveler.nationality
      ) {
        alert(
          `Please select nationality for Traveler ${number}`
        );
        return false;
      }


      if (
        showGender &&
        requiredGender &&
        !traveler.sex
      ) {
        alert(
          `Please select gender for Traveler ${number}`
        );
        return false;
      }


      if (
        showDob &&
        requiredDob &&
        !traveler.dateOfBirth
      ) {
        alert(
          `Please select date of birth for Traveler ${number}`
        );
        return false;
      }


      if (
        showPlaceOfBirth &&
        requiredPlaceOfBirth &&
        !traveler.placeOfBirth.trim()
      ) {
        alert(
          `Please enter place of birth for Traveler ${number}`
        );
        return false;
      }


      if (
        showMotherName &&
        requiredMotherName &&
        !traveler.motherName.trim()
      ) {
        alert(
          `Please enter mother name for Traveler ${number}`
        );
        return false;
      }


      if (
        showFatherName &&
        requiredFatherName &&
        !traveler.fatherName.trim()
      ) {
        alert(
          `Please enter father name for Traveler ${number}`
        );
        return false;
      }


      if (
        showSpouseName &&
        requiredSpouseName &&
        !traveler.spouseName.trim()
      ) {
        alert(
          `Please enter spouse name for Traveler ${number}`
        );
        return false;
      }


      if (
        showTravelDate &&
        requiredTravelDate &&
        !traveler.travelDate
      ) {
        alert(
          `Please select travel date for Traveler ${number}`
        );
        return false;
      }


      if (
        showPanNumber &&
        requiredPanNumber &&
        !traveler.panNumber.trim()
      ) {
        alert(
          `Please enter PAN number for Traveler ${number}`
        );
        return false;
      }


      if (
        showOccupation &&
        requiredOccupation &&
        !traveler.occupation
      ) {
        alert(
          `Please select occupation for Traveler ${number}`
        );
        return false;
      }


      if (
        showCheckin &&
        requiredCheckin &&
        !traveler.checkinPoint.trim()
      ) {
        alert(
          `Please enter check-in point for Traveler ${number}`
        );
        return false;
      }


      if (
        showCheckout &&
        requiredCheckout &&
        !traveler.checkoutPoint.trim()
      ) {
        alert(
          `Please enter check-out point for Traveler ${number}`
        );
        return false;
      }


      /* DOCUMENTS */

      if (
        showPhoto &&
        requiredPhoto &&
        !traveler.files.travelerPhoto
      ) {
        alert(
          `Please upload traveler's photo for Traveler ${number}`
        );
        return false;
      }


      if (
        showPassportFront &&
        requiredPassportFront &&
        !traveler.files.passportFront
      ) {
        alert(
          `Please upload passport front for Traveler ${number}`
        );
        return false;
      }


      if (
        showPassportBack &&
        requiredPassportBack &&
        !traveler.files.passportBack
      ) {
        alert(
          `Please upload passport back for Traveler ${number}`
        );
        return false;
      }


      if (
        showPanCard &&
        requiredPanCard &&
        !traveler.files.panCard
      ) {
        alert(
          `Please upload PAN card for Traveler ${number}`
        );
        return false;
      }


      if (
        showHotelVoucher &&
        requiredHotelVoucher &&
        !traveler.files.hotelVoucher
      ) {
        alert(
          `Please upload hotel voucher for Traveler ${number}`
        );
        return false;
      }


      if (
        showAdditionalFolder &&
        requiredAdditionalFolder &&
        !traveler.files.additionalFolder
      ) {
        alert(
          `Please upload ${additionalFolderLabel} for Traveler ${number}`
        );
        return false;
      }
    }


    if (
      showInsurance &&
      requiredInsurance &&
      !insurance
    ) {
      alert(
        "Insurance is required for this visa."
      );

      return false;
    }


    return true;
  };


  /* =====================================================
     SAVE
  ===================================================== */

  const [paymentLoading, setPaymentLoading] = useState(false);

  const handleSave = async () => {
    if (!validateTravelers()) {
      return;
    }
  
    // Easebuzz sirf Online payment ke liye
    if (paymentMethod !== "Online") {
      alert("Please select Online payment.");
      return;
    }
  
    if (!totalAmount || Number(totalAmount) <= 0) {
      alert("Invalid payment amount.");
      return;
    }
  
    try {
      setPaymentLoading(true);
  
      const firstTraveler = travelers?.[0] || {};
  
      /*
        NOTE:
        Easebuzz ko firstname, phone aur email required hain.
  
        Agar tumhare logged-in user ka email/phone
        localStorage me available hai to yahan se lenge.
      */
  
        let user = {};

        try {
          const meResponse = await getMe();
        
          user =
            meResponse?.user ||
            meResponse?.data?.user ||
            meResponse?.data ||
            {};
        
          console.log("Logged-in user:", user);
        } catch (error) {
          console.error(
            "Unable to fetch logged-in user:",
            error
          );
        
          alert(
            "Unable to fetch your account details. Please login again."
          );
        
          return;
        }
        
        const email =
        user?.email ||
        user?.emailAddress ||
        "";
      
      const phone =
        paymentPhone ||
        user?.phoneNumber ||
        user?.phone ||
        user?.mobile ||
        user?.mobileNumber ||
        "";

        if (!phone) {
          alert("Please enter your mobile number to continue with payment.");
          return;
        }
        
        const cleanPhone = String(phone).replace(/\D/g, "");
        
        if (cleanPhone.length !== 10) {
          alert("Please enter a valid 10-digit mobile number.");
          return;
        }
      console.log("Payment contact details:", {
        email,
        phone,
      });
  
// ==========================================
// SAVE VISA APPLICATION BEFORE EASEBUZZ
// ==========================================

const applicationFormData = new FormData();

// Remove temporary traveler ID and File objects
const travelersPayload = travelers.map((traveler) => {
  const {
    id,
    files,
    ...travelerDetails
  } = traveler;

  return travelerDetails;
});

const applicationPayload = {
  applicant: {
    name:
      user?.fullName ||
      user?.name ||
      firstTraveler?.firstName ||
      "",

    email:
      email ||
      paymentEmail ||
      "",

    phone: cleanPhone,
  },

  visa: visa || {},

  goingFrom,
  goingTo,
  travelDate,
  returnDate,

  travelers: travelersPayload,

  insurance: Boolean(insurance),

  visaTotal: Number(visaTotal) || 0,

  insuranceTotal:
    Number(insuranceTotal) || 0,

  totalAmount:
    Number(totalAmount) || 0,

  paymentMethod,
};

applicationFormData.append(
  "application",
  JSON.stringify(applicationPayload)
);

// Attach traveler documents
travelers.forEach((traveler, index) => {
  Object.entries(traveler.files || {}).forEach(
    ([fileKey, file]) => {
      if (file instanceof File) {
        applicationFormData.append(
          `traveler_${index}_${fileKey}`,
          file
        );
      }
    }
  );
});

// Save application in backend
const savedApplication = await submitVisaApplication(
  applicationFormData
);

if (!savedApplication?.success) {
  throw new Error(
    savedApplication?.message ||
    "Unable to save visa application."
  );
}

console.log(
  "Visa application saved successfully:",
  savedApplication.application
);
      const paymentData = {
        txnid: `VISA_${Date.now()}`,
  
        amount: Number(totalAmount).toFixed(2),
  
        productinfo:
          visa?.about ||
          `${goingTo || "Visa"} Visa Application`,
  
        firstname:
          firstTraveler?.firstName ||
          user?.fullName ||
          user?.name ||
          "Customer",
  
        phone: String(phone),
  
        email: String(email),
  
        udf1: visa?._id || "",
  
        udf2: "",
      };
  
      console.log(
        "========== EASEBUZZ PAYMENT =========="
      );
  
      console.log(paymentData);
  
      const response =
        await initiatePayment(paymentData);
  
      console.log(
        "Easebuzz initiate response:",
        response
      );
  
      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Unable to initiate payment"
        );
      }
  
      /*
        Backend response:
  
        {
          success: true,
          message: "...",
          data: {
            status: 1,
            data: "ACCESS_KEY"
          }
        }
      */
  
      const easebuzzData =
        response?.data;
  
      const accessKey =
        easebuzzData?.data ||
        easebuzzData?.access_key ||
        easebuzzData?.accessKey;
  
      if (!accessKey) {
        console.error(
          "Easebuzz access key missing:",
          easebuzzData
        );
  
        throw new Error(
          "Easebuzz access key was not received."
        );
      }
  
      /*
        TEST CHECKOUT
      */
  
        console.log("Easebuzz ACCESS KEY:", accessKey);

        const checkoutUrl =
        import.meta.env.VITE_EASEBUZZ_ENV === "test"
          ? `https://testpay.easebuzz.in/v2/pay/${accessKey}`
          : `https://pay.easebuzz.in/v2/pay/${accessKey}`;
      
      console.log("Easebuzz checkout URL:", checkoutUrl);
      
      window.location.href = checkoutUrl;
  
    } catch (error) {
      console.error(
        "Easebuzz payment error:",
        error
      );
  
      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to start payment. Please try again."
      );
    } finally {
      setPaymentLoading(false);
    }
  };


  return (
    <div
      className="min-h-screen bg-[#f7f8fa]"
      style={{
        fontFamily:
          "'Poppins', sans-serif",
      }}
    >

      {/* =====================================================
          PAGE INTRO
      ===================================================== */}

      <section className="border-b border-[#e9edf2] bg-white">

        <div className="mx-auto max-w-[1380px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">

            <div>

              <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-[#6b7788]">

                <span className="text-[#356ae6]">
                  Visa Application
                </span>

                <ChevronRight size={14} />

                <span>
                  Traveler Details
                </span>

              </div>


              <h2 className="text-[30px] font-semibold leading-tight tracking-[-0.6px] text-[#263244] sm:text-[36px]">
                Tell us about your travelers
              </h2>


              <p className="mt-3 max-w-2xl text-[15px] font-normal leading-7 text-[#718096] sm:text-[16px]">
                Upload your documents first. We'll automatically
                fill the information we can read, and you can
                review or complete the remaining details.
              </p>

            </div>


            {/* PROGRESS */}

            <div className="min-w-[280px] rounded-2xl border border-[#e4e9ef] bg-[#fbfcfd] px-5 py-4">

              <div className="mb-3 flex items-center justify-between">

                <span className="text-[12px] font-medium text-[#8793a3]">
                  Application progress
                </span>

                <span className="text-[12px] font-medium text-[#356ae6]">
                  Step 2 of 3
                </span>

              </div>


              <div className="flex items-center">

                <ProgressStep
                  number="1"
                  label="Visa"
                  complete
                />

                <div className="h-px flex-1 bg-[#356ae6]" />

                <ProgressStep
                  number="2"
                  label="Travelers"
                  active
                />

                <div className="h-px flex-1 bg-[#dfe5ec]" />

                <ProgressStep
                  number="3"
                  label="Payment"
                />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="mx-auto max-w-[1380px] px-4 py-7 pb-32 sm:px-6 lg:px-8 lg:py-9">

        <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_350px]">


          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="min-w-0">


            {/* COUNTRY REQUIREMENT */}

            {countryConfig && (
              <div className="mb-6 flex gap-3 rounded-2xl border border-[#dce7fb] bg-[#f5f8ff] p-4 sm:p-5">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#356ae6] shadow-sm">
                  <ShieldCheck size={19} />
                </div>

                <div>

                  <h3 className="text-[14px] font-semibold text-[#334155] sm:text-[15px]">
                    Application requirements for{" "}
                    {goingTo ||
                      "this destination"}
                  </h3>

                  <p className="mt-1 text-[13px] font-normal leading-5.5 text-[#718096]">
                    The fields and documents below are
                    displayed according to the requirements
                    configured for this visa.
                  </p>

                </div>

              </div>
            )}


            {/* =================================================
                TRAVELERS
            ================================================= */}

            <div className="space-y-6">

              {travelers.map(
                (traveler, index) => (
                  <TravelerCard
                    key={traveler.id}
                    traveler={traveler}
                    index={index}

                    updateTraveler={
                      updateTraveler
                    }

                    updateFile={
                      updateFile
                    }

                    removeFile={
                      removeFile
                    }

                    removeTraveler={
                      removeTraveler
                    }

                    totalTravelers={
                      travelers.length
                    }

                    onPassportUpload={
                      handlePassportUpload
                    }

                    readingPassport={
                      !!readingPassport[
                        traveler.id
                      ]
                    }

                    onPanUpload={
                      handlePanUpload
                    }

                    readingPan={
                      !!readingPan[
                        traveler.id
                      ]
                    }


                    showFirstName={
                      showFirstName
                    }

                    requiredFirstName={
                      requiredFirstName
                    }


                    showLastName={
                      showLastName
                    }

                    requiredLastName={
                      requiredLastName
                    }


                    showPassportNumber={
                      showPassportNumber
                    }

                    requiredPassportNumber={
                      requiredPassportNumber
                    }


                    showNationality={
                      showNationality
                    }

                    requiredNationality={
                      requiredNationality
                    }


                    showGender={
                      showGender
                    }

                    requiredGender={
                      requiredGender
                    }


                    showDob={
                      showDob
                    }

                    requiredDob={
                      requiredDob
                    }


                    showPlaceOfBirth={
                      showPlaceOfBirth
                    }

                    requiredPlaceOfBirth={
                      requiredPlaceOfBirth
                    }


                    showSpouseName={
                      showSpouseName
                    }

                    requiredSpouseName={
                      requiredSpouseName
                    }


                    showMotherName={
                      showMotherName
                    }

                    requiredMotherName={
                      requiredMotherName
                    }


                    showFatherName={
                      showFatherName
                    }

                    requiredFatherName={
                      requiredFatherName
                    }


                    showTravelDate={
                      showTravelDate
                    }

                    requiredTravelDate={
                      requiredTravelDate
                    }


                    showPanCard={
                      showPanCard
                    }

                    requiredPanCard={
                      requiredPanCard
                    }


                    showPanNumber={
                      showPanNumber
                    }

                    requiredPanNumber={
                      requiredPanNumber
                    }


                    showOccupation={
                      showOccupation
                    }

                    requiredOccupation={
                      requiredOccupation
                    }


                    showPhoto={
                      showPhoto
                    }

                    requiredPhoto={
                      requiredPhoto
                    }


                    showPassportFront={
                      showPassportFront
                    }

                    requiredPassportFront={
                      requiredPassportFront
                    }


                    showPassportBack={
                      showPassportBack
                    }

                    requiredPassportBack={
                      requiredPassportBack
                    }


                    showHotelVoucher={
                      showHotelVoucher
                    }

                    requiredHotelVoucher={
                      requiredHotelVoucher
                    }


                    showCheckin={
                      showCheckin
                    }

                    requiredCheckin={
                      requiredCheckin
                    }


                    showCheckout={
                      showCheckout
                    }

                    requiredCheckout={
                      requiredCheckout
                    }


                    showAdditionalFolder={
                      showAdditionalFolder
                    }

                    requiredAdditionalFolder={
                      requiredAdditionalFolder
                    }


                    additionalFolderLabel={
                      additionalFolderLabel
                    }
                  />
                )
              )}

            </div>


            {/* ADD TRAVELER */}

            <button
              type="button"
              onClick={addTraveler}
              className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl border border-dashed border-[#cbd5e1] bg-white px-5 py-4 text-[14px] font-medium text-[#526174] transition hover:border-[#356ae6] hover:bg-[#f8faff] hover:text-[#356ae6]"
            >
              <UserPlus size={18} />
              Add another traveler
            </button>


            {/* VISA INFORMATION */}

            <div className="mt-7">

              <VisaInformation
                visa={visa}
                goingFrom={goingFrom}
                goingTo={goingTo}
                travelDate={travelDate}
                returnDate={returnDate}
              />

            </div>


            {/* INSURANCE */}

            {showInsurance && (
              <div className="mt-6">

                <InsuranceCard
                  insurance={insurance}
                  setInsurance={
                    setInsurance
                  }
                  required={
                    requiredInsurance
                  }
                  travelersCount={
                    travelers.length
                  }
                  insurancePerTraveler={
                    insurancePerTraveler
                  }
                  insuranceTotal={
                    insuranceTotal
                  }
                />

              </div>
            )}

          </div>


          {/* =================================================
              RIGHT SUMMARY
          ================================================= */}

          <aside className="lg:sticky lg:top-[100px]">

            <div className="overflow-hidden rounded-2xl border border-[#e1e7ed] bg-white shadow-[0_8px_30px_rgba(30,41,59,0.06)]">

              {/* SUMMARY HEADER */}

              <div className="border-b border-[#e8edf2] bg-[#fbfcfd] px-5 py-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef4ff] text-[#356ae6]">
                    <CreditCard size={18} />
                  </div>

                  <div>

                    <h3 className="text-[16px] font-semibold text-[#334155]">
                      Price Summary
                    </h3>

                    <p className="mt-0.5 text-[12px] text-[#8793a3]">
                      {travelers.length} traveler
                      {travelers.length > 1
                        ? "s"
                        : ""}
                    </p>

                  </div>

                </div>

              </div>


              {/* ROUTE */}

              {(goingFrom ||
                goingTo) && (
                <div className="border-b border-[#edf0f3] px-5 py-4">

                  <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#9aa5b4]">
                    Travel route
                  </p>

                  <div className="flex items-center gap-2">

                    <span className="text-[14px] font-medium text-[#475569]">
                      {goingFrom ||
                        "India"}
                    </span>

                    <Plane
                      size={15}
                      className="rotate-[20deg] text-[#8b98a8]"
                    />

                    <span className="text-[14px] font-medium text-[#475569]">
                      {goingTo ||
                        "Destination"}
                    </span>

                  </div>

                </div>
              )}


              {/* PRICE */}

              <div className="px-5 py-5">

                <div className="space-y-4">

                  <SummaryRow
                    label={`Visa fee × ${travelers.length}`}
                    value={`₹${formatAmount(
                      visaTotal
                    )}`}
                  />

                  {insurance && (
                    <SummaryRow
                      label={`Travel insurance × ${travelers.length}`}
                      value={`₹${formatAmount(
                        insuranceTotal
                      )}`}
                    />
                  )}

                </div>


                <div className="my-5 h-px bg-[#e8edf2]" />


                <div className="flex items-end justify-between">

                  <div>

                    <p className="text-[13px] font-normal text-[#7b8796]">
                      Total payable
                    </p>

                    <p className="mt-1 text-[28px] font-semibold tracking-[-0.5px] text-[#263244]">
                      ₹{formatAmount(
                        totalAmount
                      )}
                    </p>

                  </div>

                  <span className="mb-1 rounded-lg bg-[#f0fdf4] px-2.5 py-1 text-[11px] font-medium text-[#15803d]">
                    Secure
                  </span>

                </div>

              </div>


              {/* PAYMENT METHODS */}

              <div className="border-t border-[#e8edf2] px-5 py-5">

                {/* CONTACT DETAILS FOR PAYMENT */}

<div className="border-t border-[#e8edf2] px-5 py-5">

<p className="mb-1 text-[13px] font-medium text-[#526174]">
  Payment contact details
</p>

<p className="mb-4 text-[11px] leading-5 text-[#8a96a5]">
  Your mobile number is required to continue with the payment.
</p>

{/* EMAIL */}

<div className="mb-3">
  <label className="mb-1.5 block text-[12px] font-medium text-[#64748b]">
    Email
  </label>

  <input
    type="email"
    value={paymentEmail || ""}
    onChange={(e) =>
      setPaymentEmail(e.target.value)
    }
    placeholder="Enter your email"
    className="h-[46px] w-full rounded-xl border border-[#dfe5ec] bg-[#fcfdfe] px-3.5 text-[13px] text-[#475569] outline-none transition focus:border-[#8fb0f5] focus:bg-white focus:ring-4 focus:ring-[#356ae6]/[0.07]"
  />
</div>

{/* MOBILE */}

<div>
  <label className="mb-1.5 block text-[12px] font-medium text-[#64748b]">
    Mobile Number
    <span className="ml-1 text-[#e35d6a]">*</span>
  </label>

  <input
    type="tel"
    value={paymentPhone}
    onChange={(e) => {
      const value = e.target.value
        .replace(/\D/g, "")
        .slice(0, 10);

      setPaymentPhone(value);
    }}
    placeholder="Enter 10-digit mobile number"
    maxLength={10}
    className="h-[46px] w-full rounded-xl border border-[#dfe5ec] bg-[#fcfdfe] px-3.5 text-[13px] text-[#475569] outline-none transition focus:border-[#8fb0f5] focus:bg-white focus:ring-4 focus:ring-[#356ae6]/[0.07]"
  />

  <p className="mt-1.5 text-[10px] text-[#9aa5b3]">
    This number will be used for your payment transaction.
  </p>
</div>

</div>

                <p className="mb-3 text-[13px] font-medium text-[#526174]">
                  Payment method
                </p>


                <div className="grid grid-cols-2 gap-2">

                  <PaymentButton
                    active={
                      paymentMethod ===
                      "Online"
                    }
                    onClick={() =>
                      setPaymentMethod(
                        "Online"
                      )
                    }
                    icon={
                      <Plane
                        size={17}
                        className="rotate-[-25deg]"
                      />
                    }
                    label="Online"
                  />


                  <PaymentButton
                    active={
                      paymentMethod ===
                      "Wallet"
                    }
                    onClick={() =>
                      setPaymentMethod(
                        "Wallet"
                      )
                    }
                    icon={
                      <WalletCards
                        size={17}
                      />
                    }
                    label="Wallet"
                  />

                </div>

              </div>


              {/* DESKTOP CTA */}

              <div className="border-t border-[#e8edf2] p-5">

              <button
  type="button"
  onClick={handleSave}
  disabled={paymentLoading}
  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f355e] px-5 py-3.5 text-[14px] font-medium text-white transition hover:bg-[#172a4b] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
>
  {paymentLoading ? (
    <>
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      Opening payment...
    </>
  ) : (
    <>
      Continue to payment
      <ChevronRight size={17} />
    </>
  )}
</button>


                <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#8a96a5]">

                  <LockKeyhole
                    size={12}
                  />

                  <span>
                    Your information is securely handled
                  </span>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </main>


      {/* =====================================================
          MOBILE BOTTOM BAR
      ===================================================== */}

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#e1e7ed] bg-white/95 p-3 backdrop-blur-md lg:hidden">

        <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-4">

          <div>

            <p className="text-[11px] text-[#8995a5]">
              Total payable
            </p>

            <p className="text-[22px] font-semibold tracking-[-0.3px] text-[#263244]">
              ₹{formatAmount(
                totalAmount
              )}
            </p>

          </div>


          <button
  type="button"
  onClick={handleSave}
  disabled={paymentLoading}
  className="flex items-center gap-2 rounded-xl bg-[#1f355e] px-5 py-3 text-[14px] font-medium text-white transition hover:bg-[#172a4b] disabled:cursor-not-allowed disabled:opacity-60"
>
  {paymentLoading ? (
    <>
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      Opening...
    </>
  ) : (
    <>
      Continue
      <ChevronRight size={16} />
    </>
  )}
</button>

        </div>

      </div>

    </div>
  );
};


/* =========================================================
   TRAVELER CARD
========================================================= */

const TravelerCard = ({
  traveler,
  index,

  onPassportUpload,
  readingPassport,

  onPanUpload,
  readingPan,

  updateTraveler,
  updateFile,
  removeFile,
  removeTraveler,

  totalTravelers,

  showFirstName,
  requiredFirstName,

  showLastName,
  requiredLastName,

  showPassportNumber,
  requiredPassportNumber,

  showNationality,
  requiredNationality,

  showGender,
  requiredGender,

  showDob,
  requiredDob,

  showPlaceOfBirth,
  requiredPlaceOfBirth,

  showSpouseName,
  requiredSpouseName,

  showMotherName,
  requiredMotherName,

  showFatherName,
  requiredFatherName,

  showTravelDate,
  requiredTravelDate,

  showPanCard,
  requiredPanCard,

  showPanNumber,
  requiredPanNumber,

  showOccupation,
  requiredOccupation,

  showPhoto,
  requiredPhoto,

  showPassportFront,
  requiredPassportFront,

  showPassportBack,
  requiredPassportBack,

  showHotelVoucher,
  requiredHotelVoucher,

  showCheckin,
  requiredCheckin,

  showCheckout,
  requiredCheckout,

  showAdditionalFolder,
  requiredAdditionalFolder,

  additionalFolderLabel,
}) => {

  return (
    <section className="overflow-hidden rounded-2xl border border-[#e1e7ed] bg-white shadow-[0_5px_24px_rgba(30,41,59,0.045)]">

      {/* =================================================
          CARD HEADER
      ================================================= */}

      <div className="flex items-center justify-between border-b border-[#e8edf2] px-5 py-5 sm:px-6">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[15px] font-semibold text-[#356ae6]">
            {String(
              index + 1
            ).padStart(2, "0")}
          </div>


          <div>

            <h3 className="text-[17px] font-semibold text-[#334155]">
              Traveler {index + 1}
            </h3>

            <p className="mt-0.5 text-[12px] font-normal text-[#8a96a5]">
              Passenger information
            </p>

          </div>

        </div>


        {totalTravelers > 1 && (
          <button
            type="button"
            onClick={() =>
              removeTraveler(
                traveler.id
              )
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#9aa5b3] transition hover:bg-red-50 hover:text-red-500"
            title="Remove traveler"
          >
            <Trash2 size={17} />
          </button>
        )}

      </div>


      <div className="p-5 sm:p-6">


        {/* =================================================
            SMART DOCUMENT AUTOFILL
        ================================================= */}

        <div className="mb-7 overflow-hidden rounded-2xl border border-[#dce7fb] bg-gradient-to-br from-[#f7faff] via-white to-[#f3f7ff]">

          {/* HEADER */}

          <div className="flex items-start gap-3 border-b border-[#e7eefb] px-5 py-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf1ff] text-[#356ae6]">
              <UploadCloud size={18} />
            </div>

            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-2">

                <h4 className="text-[15px] font-semibold text-[#334155]">
                  Smart document autofill
                </h4>

                <span className="rounded-full bg-[#eaf7ef] px-2 py-0.5 text-[10px] font-medium text-[#3f7b50]">
                  Saves time
                </span>

              </div>

              <p className="mt-1 max-w-2xl text-[12px] font-normal leading-5 text-[#7b8798]">
                Upload your documents first and we'll
                automatically fill the details that can
                be read from them.
              </p>

            </div>

          </div>


          {/* STEPS */}

          <div className="grid gap-3 p-4 sm:grid-cols-2">


            {/* PASSPORT */}

            <div className="flex items-start gap-3 rounded-xl border border-[#e4eaf3] bg-white p-3.5">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef4ff] text-[#356ae6]">
                <FileText size={16} />
              </div>

              <div className="min-w-0 flex-1">

                <p className="text-[12px] font-semibold text-[#526174]">
                  Passport Front
                </p>

                <p className="mt-1 text-[11px] leading-4.5 text-[#8995a5]">
                  Automatically fills name, passport
                  number, nationality, gender, date
                  of birth and place of birth.
                </p>

              </div>

              <div className="shrink-0">

                {traveler.files.passportFront ? (
                  <CheckCircle2
                    size={17}
                    className="text-[#3f9257]"
                  />
                ) : (
                  <span className="text-[10px] font-medium text-[#9aa5b4]">
                    Step 1
                  </span>
                )}

              </div>

            </div>


            {/* PAN */}

            <div className="flex items-start gap-3 rounded-xl border border-[#e4eaf3] bg-white p-3.5">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f4f1ff] text-[#6655c7]">
                <CreditCard size={16} />
              </div>

              <div className="min-w-0 flex-1">

                <p className="text-[12px] font-semibold text-[#526174]">
                  PAN Card
                </p>

                <p className="mt-1 text-[11px] leading-4.5 text-[#8995a5]">
                  Automatically reads your PAN
                  number from the uploaded card.
                </p>

              </div>

              <div className="shrink-0">

                {traveler.files.panCard ? (
                  <CheckCircle2
                    size={17}
                    className="text-[#3f9257]"
                  />
                ) : (
                  <span className="text-[10px] font-medium text-[#9aa5b4]">
                    Step 2
                  </span>
                )}

              </div>

            </div>

          </div>


          {/* INFO */}

          <div className="flex items-center gap-2 border-t border-[#e7eefb] bg-[#fbfcff] px-5 py-3">

            <ShieldCheck
              size={14}
              className="shrink-0 text-[#6d83a3]"
            />

            <p className="text-[11px] leading-4.5 text-[#7d8999]">
              Only information available on the uploaded
              document will be filled automatically. You
              can review and edit the details before
              continuing.
            </p>

          </div>

        </div>


        {/* =================================================
            DOCUMENTS
        ================================================= */}

        {(showPhoto ||
          showPassportFront ||
          showPassportBack ||
          showPanCard ||
          showHotelVoucher ||
          showAdditionalFolder) && (

          <FormSection
            icon={
              <FileText size={17} />
            }
            title="Upload your documents"
            description="Start with your Passport Front and PAN Card. We'll automatically fill the information we can read from these documents."
          >

            <div className="grid gap-4 md:grid-cols-2">


              {/* PHOTO */}

              {showPhoto && (
                <UploadBox
                  label="Traveler's Photo"
                  required={
                    requiredPhoto
                  }
                  file={
                    traveler.files
                      .travelerPhoto
                  }
                  onFile={(file) =>
                    updateFile(
                      traveler.id,
                      "travelerPhoto",
                      file
                    )
                  }
                  onRemove={() =>
                    removeFile(
                      traveler.id,
                      "travelerPhoto"
                    )
                  }
                  icon={
                    <Camera
                      size={18}
                    />
                  }
                />
              )}


              {/* PASSPORT FRONT */}

              {showPassportFront && (
                <UploadBox
                  label="Passport Front"
                  helperText="Auto-fills passport details"
                  required={
                    requiredPassportFront
                  }
                  file={
                    traveler.files
                      .passportFront
                  }
                  reading={
                    readingPassport
                  }
                  onFile={(file) =>
                    onPassportUpload(
                      traveler.id,
                      file
                    )
                  }
                  onRemove={() =>
                    removeFile(
                      traveler.id,
                      "passportFront"
                    )
                  }
                  icon={
                    <FileText
                      size={18}
                    />
                  }
                />
              )}


              {/* PASSPORT BACK */}

              {showPassportBack && (
                <UploadBox
                  label="Passport Back"
                  required={
                    requiredPassportBack
                  }
                  file={
                    traveler.files
                      .passportBack
                  }
                  onFile={(file) =>
                    updateFile(
                      traveler.id,
                      "passportBack",
                      file
                    )
                  }
                  onRemove={() =>
                    removeFile(
                      traveler.id,
                      "passportBack"
                    )
                  }
                  icon={
                    <FileText
                      size={18}
                    />
                  }
                />
              )}


              {/* PAN CARD */}

              {showPanCard && (
                <UploadBox
                  label="Traveler's PAN Card"
                  helperText="Auto-fills PAN number"
                  required={
                    requiredPanCard
                  }
                  file={
                    traveler.files
                      .panCard
                  }
                  reading={
                    readingPan
                  }
                  onFile={(file) =>
                    onPanUpload(
                      traveler.id,
                      file
                    )
                  }
                  onRemove={() =>
                    removeFile(
                      traveler.id,
                      "panCard"
                    )
                  }
                  icon={
                    <CreditCard
                      size={18}
                    />
                  }
                />
              )}


              {/* HOTEL VOUCHER */}

              {showHotelVoucher && (
                <UploadBox
                  label="Hotel Voucher"
                  required={
                    requiredHotelVoucher
                  }
                  file={
                    traveler.files
                      .hotelVoucher
                  }
                  onFile={(file) =>
                    updateFile(
                      traveler.id,
                      "hotelVoucher",
                      file
                    )
                  }
                  onRemove={() =>
                    removeFile(
                      traveler.id,
                      "hotelVoucher"
                    )
                  }
                  icon={
                    <Hotel
                      size={18}
                    />
                  }
                />
              )}


              {/* ADDITIONAL */}

              {showAdditionalFolder && (
                <UploadBox
                  label={
                    additionalFolderLabel
                  }
                  required={
                    requiredAdditionalFolder
                  }
                  file={
                    traveler.files
                      .additionalFolder
                  }
                  onFile={(file) =>
                    updateFile(
                      traveler.id,
                      "additionalFolder",
                      file
                    )
                  }
                  onRemove={() =>
                    removeFile(
                      traveler.id,
                      "additionalFolder"
                    )
                  }
                  icon={
                    <FileText
                      size={18}
                    />
                  }
                />
              )}

            </div>

          </FormSection>
        )}


        {/* =================================================
            PERSONAL DETAILS
        ================================================= */}

        <FormSection
          icon={
            <User size={17} />
          }
          title="Personal details"
          description="Review the information filled from your passport and complete anything that is still missing."
        >

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">


            {/* FIRST NAME */}

            {showFirstName && (
              <InputField
                label="First Name"
                required={
                  requiredFirstName
                }
                icon={
                  <User size={16} />
                }
                placeholder="Enter first name"
                value={
                  traveler.firstName
                }
                autoFilled={
                  !!traveler.files
                    .passportFront &&
                  !!traveler.firstName
                }
                onChange={(e) =>
                  updateTraveler(
                    traveler.id,
                    "firstName",
                    e.target.value
                  )
                }
              />
            )}


            {/* LAST NAME */}

            {showLastName && (
              <InputField
                label="Last Name"
                required={
                  requiredLastName
                }
                icon={
                  <User size={16} />
                }
                placeholder="Enter last name"
                value={
                  traveler.lastName
                }
                autoFilled={
                  !!traveler.files
                    .passportFront &&
                  !!traveler.lastName
                }
                onChange={(e) =>
                  updateTraveler(
                    traveler.id,
                    "lastName",
                    e.target.value
                  )
                }
              />
            )}


            {/* NATIONALITY */}

            {showNationality && (
              <SelectField
                label="Nationality"
                required={
                  requiredNationality
                }
                icon={
                  <Globe2 size={16} />
                }
                placeholder="Select nationality"
                value={
                  traveler.nationality
                }
                autoFilled={
                  !!traveler.files
                    .passportFront &&
                  !!traveler.nationality
                }
                onChange={(e) =>
                  updateTraveler(
                    traveler.id,
                    "nationality",
                    e.target.value
                  )
                }
                options={[
                  "Indian",
                  "United Arab Emirates",
                  "United States",
                  "United Kingdom",
                  "Canada",
                  "Australia",
                  "Other",
                ]}
              />
            )}


            {/* PASSENGER TYPE */}

            <SelectField
              label="Passenger Type"
              required
              icon={
                <Users size={16} />
              }
              value={
                traveler.passengerType
              }
              onChange={(e) =>
                updateTraveler(
                  traveler.id,
                  "passengerType",
                  e.target.value
                )
              }
              options={[
                "Adult",
                "Child",
                "Infant",
              ]}
            />


            {/* SEX */}

            {showGender && (
              <SelectField
                label="Sex"
                required={
                  requiredGender
                }
                icon={
                  <VenusAndMars
                    size={16}
                  />
                }
                placeholder="Select gender"
                value={
                  traveler.sex
                }
                autoFilled={
                  !!traveler.files
                    .passportFront &&
                  !!traveler.sex
                }
                onChange={(e) =>
                  updateTraveler(
                    traveler.id,
                    "sex",
                    e.target.value
                  )
                }
                options={[
                  "Male",
                  "Female",
                  "Other",
                ]}
              />
            )}


            {/* DOB */}

            {showDob && (
              <InputField
                label="Date of Birth"
                required={
                  requiredDob
                }
                type="date"
                icon={
                  <CalendarDays
                    size={16}
                  />
                }
                value={
                  traveler.dateOfBirth
                }
                autoFilled={
                  !!traveler.files
                    .passportFront &&
                  !!traveler.dateOfBirth
                }
                onChange={(e) =>
                  updateTraveler(
                    traveler.id,
                    "dateOfBirth",
                    e.target.value
                  )
                }
              />
            )}

          </div>

        </FormSection>


        {/* =================================================
            PASSPORT INFORMATION
        ================================================= */}

        {showPassportNumber && (
          <FormSection
            icon={
              <FileText size={17} />
            }
            title="Passport information"
            description="Review the passport number read from your uploaded passport."
          >

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              <InputField
                label="Passport Number"
                required={
                  requiredPassportNumber
                }
                icon={
                  <FileText
                    size={16}
                  />
                }
                placeholder="A1234567"
                value={
                  traveler.passportNumber
                }
                autoFilled={
                  !!traveler.files
                    .passportFront &&
                  !!traveler.passportNumber
                }
                onChange={(e) =>
                  updateTraveler(
                    traveler.id,
                    "passportNumber",
                    e.target.value.toUpperCase()
                  )
                }
              />

            </div>

          </FormSection>
        )}


        {/* =================================================
            FAMILY & BACKGROUND
        ================================================= */}

        {(showPlaceOfBirth ||
          showMotherName ||
          showFatherName ||
          showSpouseName) && (

          <FormSection
            icon={
              <HeartPulse
                size={17}
              />
            }
            title="Family & background"
            description="Some of these details may not be available on the passport and need to be entered manually."
          >

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">


              {/* PLACE OF BIRTH */}

              {showPlaceOfBirth && (
                <InputField
                  label="Place of Birth"
                  required={
                    requiredPlaceOfBirth
                  }
                  icon={
                    <MapPin
                      size={16}
                    />
                  }
                  placeholder="Enter place of birth"
                  value={
                    traveler.placeOfBirth
                  }
                  autoFilled={
                    !!traveler.files
                      .passportFront &&
                    !!traveler.placeOfBirth
                  }
                  onChange={(e) =>
                    updateTraveler(
                      traveler.id,
                      "placeOfBirth",
                      e.target.value
                    )
                  }
                />
              )}


              {/* MOTHER */}

              {showMotherName && (
                <InputField
                  label="Mother's Name"
                  required={
                    requiredMotherName
                  }
                  icon={
                    <User size={16} />
                  }
                  placeholder="Enter mother's name"
                  value={
                    traveler.motherName
                  }
                  onChange={(e) =>
                    updateTraveler(
                      traveler.id,
                      "motherName",
                      e.target.value
                    )
                  }
                />
              )}


              {/* FATHER */}

              {showFatherName && (
                <InputField
                  label="Father's Name"
                  required={
                    requiredFatherName
                  }
                  icon={
                    <User size={16} />
                  }
                  placeholder="Enter father's name"
                  value={
                    traveler.fatherName
                  }
                  onChange={(e) =>
                    updateTraveler(
                      traveler.id,
                      "fatherName",
                      e.target.value
                    )
                  }
                />
              )}


              {/* SPOUSE */}

              {showSpouseName && (
                <InputField
                  label="Spouse's Name"
                  required={
                    requiredSpouseName
                  }
                  icon={
                    <User size={16} />
                  }
                  placeholder="Enter spouse's name"
                  value={
                    traveler.spouseName
                  }
                  onChange={(e) =>
                    updateTraveler(
                      traveler.id,
                      "spouseName",
                      e.target.value
                    )
                  }
                />
              )}

            </div>

          </FormSection>
        )}


        {/* =================================================
            TRAVEL DETAILS
        ================================================= */}

        {(showTravelDate ||
          showCheckin ||
          showCheckout) && (

          <FormSection
            icon={
              <Plane size={17} />
            }
            title="Travel details"
            description="Add the travel information required for your application."
          >

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">


              {/* TRAVEL DATE */}

              {showTravelDate && (
                <InputField
                  label="Travel Date"
                  required={
                    requiredTravelDate
                  }
                  type="date"
                  icon={
                    <CalendarDays
                      size={16}
                    />
                  }
                  value={
                    traveler.travelDate
                  }
                  onChange={(e) =>
                    updateTraveler(
                      traveler.id,
                      "travelDate",
                      e.target.value
                    )
                  }
                />
              )}


              {/* CHECK IN */}

              {showCheckin && (
                <InputField
                  label="Check-in Point"
                  required={
                    requiredCheckin
                  }
                  icon={
                    <LogInIcon />
                  }
                  placeholder="Enter check-in point"
                  value={
                    traveler.checkinPoint
                  }
                  onChange={(e) =>
                    updateTraveler(
                      traveler.id,
                      "checkinPoint",
                      e.target.value
                    )
                  }
                />
              )}


              {/* CHECK OUT */}

              {showCheckout && (
                <InputField
                  label="Check-out Point"
                  required={
                    requiredCheckout
                  }
                  icon={
                    <LogOutIcon />
                  }
                  placeholder="Enter check-out point"
                  value={
                    traveler.checkoutPoint
                  }
                  onChange={(e) =>
                    updateTraveler(
                      traveler.id,
                      "checkoutPoint",
                      e.target.value
                    )
                  }
                />
              )}

            </div>

          </FormSection>
        )}


        {/* =================================================
            PROFESSIONAL INFORMATION
        ================================================= */}

        {(showPanNumber ||
          showOccupation) && (

          <FormSection
            icon={
              <BriefcaseBusiness
                size={17}
              />
            }
            title="Professional information"
            description="PAN number can be filled automatically from the uploaded PAN card. Occupation needs to be selected manually."
          >

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">


              {/* PAN NUMBER */}

              {showPanNumber && (
                <InputField
                  label="India PAN Card Number"
                  required={
                    requiredPanNumber
                  }
                  icon={
                    <CreditCard
                      size={16}
                    />
                  }
                  placeholder="ABCDE1234F"
                  value={
                    traveler.panNumber
                  }
                  autoFilled={
                    !!traveler.files
                      .panCard &&
                    !!traveler.panNumber
                  }
                  onChange={(e) =>
                    updateTraveler(
                      traveler.id,
                      "panNumber",
                      e.target.value.toUpperCase()
                    )
                  }
                />
              )}


              {/* OCCUPATION */}

              {showOccupation && (
                <SelectField
                  label="Occupation"
                  required={
                    requiredOccupation
                  }
                  icon={
                    <BriefcaseBusiness
                      size={16}
                    />
                  }
                  placeholder="Select occupation"
                  value={
                    traveler.occupation
                  }
                  onChange={(e) =>
                    updateTraveler(
                      traveler.id,
                      "occupation",
                      e.target.value
                    )
                  }
                  options={[
                    "Business",
                    "Salaried Employee",
                    "Self Employed",
                    "Student",
                    "Government Employee",
                    "Retired",
                    "Homemaker",
                    "Professional",
                    "Other",
                  ]}
                />
              )}

            </div>

          </FormSection>
        )}

      </div>

    </section>
  );
};


/* =========================================================
   FORM SECTION
========================================================= */

const FormSection = ({
  icon,
  title,
  description,
  children,
}) => {

  return (
    <div className="border-b border-[#edf0f3] py-7 first:pt-0 last:border-b-0 last:pb-0">

      <div className="mb-5 flex items-start gap-3">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f1f5f9] text-[#526174]">
          {icon}
        </div>

        <div>

          <h4 className="text-[16px] font-semibold text-[#3b4859]">
            {title}
          </h4>

          {description && (
            <p className="mt-1 max-w-2xl text-[13px] font-normal leading-5.5 text-[#8490a0]">
              {description}
            </p>
          )}

        </div>

      </div>

      {children}

    </div>
  );
};


/* =========================================================
   INPUT FIELD
========================================================= */

const InputField = ({
  label,
  required = false,
  icon,
  type = "text",
  placeholder = "",
  value = "",
  onChange,
  autoFilled = false,
}) => {

  return (
    <label className="block">

      {/* LABEL */}

      <span className="mb-2 flex flex-wrap items-center gap-1.5 text-[13px] font-medium text-[#526174]">

        {label}

        {required && (
          <span className="text-[#e35d6a]">
            *
          </span>
        )}

        {autoFilled && (
          <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-[#edf8f0] px-2 py-0.5 text-[9px] font-medium text-[#3f8050]">

            <CheckCircle2
              size={10}
            />

            Auto-filled

          </span>
        )}

      </span>


      <div className="group relative">

        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 flex -translate-y-1/2 items-center text-[#9aa6b5] transition group-focus-within:text-[#356ae6]">
            {icon}
          </span>
        )}


        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`h-[52px] w-full rounded-xl border text-[14px] font-normal text-[#475569] outline-none transition placeholder:text-[#a2adba] focus:border-[#8fb0f5] focus:bg-white focus:ring-4 focus:ring-[#356ae6]/[0.07] ${
            autoFilled
              ? "border-[#cfe5d5] bg-[#f8fcf9]"
              : "border-[#dfe5ec] bg-[#fcfdfe]"
          } ${
            icon
              ? "pl-11 pr-3.5"
              : "px-3.5"
          }`}
        />

      </div>

    </label>
  );
};


/* =========================================================
   SELECT FIELD
========================================================= */

const SelectField = ({
  label,
  required = false,
  icon,
  placeholder = "Select",
  value = "",
  onChange,
  options = [],
  autoFilled = false,
}) => {

  return (
    <label className="block">

      {/* LABEL */}

      <span className="mb-2 flex flex-wrap items-center gap-1.5 text-[13px] font-medium text-[#526174]">

        {label}

        {required && (
          <span className="text-[#e35d6a]">
            *
          </span>
        )}

        {autoFilled && (
          <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-[#edf8f0] px-2 py-0.5 text-[9px] font-medium text-[#3f8050]">

            <CheckCircle2
              size={10}
            />

            Auto-filled

          </span>
        )}

      </span>


      <div className="group relative">

        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 z-10 flex -translate-y-1/2 items-center text-[#9aa6b5] transition group-focus-within:text-[#356ae6]">
            {icon}
          </span>
        )}


        <select
          value={value}
          onChange={onChange}
          className={`h-[52px] w-full appearance-none rounded-xl border text-[14px] font-normal text-[#475569] outline-none transition focus:border-[#8fb0f5] focus:bg-white focus:ring-4 focus:ring-[#356ae6]/[0.07] ${
            autoFilled
              ? "border-[#cfe5d5] bg-[#f8fcf9]"
              : "border-[#dfe5ec] bg-[#fcfdfe]"
          } ${
            icon
              ? "pl-11 pr-10"
              : "px-3.5 pr-10"
          }`}
        >

          {!value && (
            <option value="">
              {placeholder}
            </option>
          )}

          {options.map(
            (option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            )
          )}

        </select>


        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9aa6b5]">

          <ChevronRight
            size={15}
            className="rotate-90"
          />

        </span>

      </div>

    </label>
  );
};


/* =========================================================
   UPLOAD BOX
========================================================= */

const UploadBox = ({
  label,
  helperText = "",
  required = false,
  file,
  onFile,
  onRemove,
  icon,
  reading = false,
}) => {

  const inputId = useMemo(
    () =>
      `upload-${Math.random()
        .toString(36)
        .slice(2, 11)}`,
    []
  );


  return (
    <div>

      <label
        htmlFor={inputId}
        className={`group flex min-h-[118px] cursor-pointer items-center gap-4 rounded-xl border border-dashed p-4 transition ${
          file
            ? "border-[#b7d6c1] bg-[#f7fcf8]"
            : "border-[#d6dee7] bg-[#fcfdfe] hover:border-[#9fb7df] hover:bg-[#f9fbff]"
        }`}
      >

        {/* ICON */}

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            file
              ? "bg-[#e8f6ec] text-[#32814b]"
              : "bg-[#eef4ff] text-[#356ae6]"
          }`}
        >

          {file ? (
            <CheckCircle2
              size={19}
            />
          ) : (
            icon || (
              <UploadCloud
                size={19}
              />
            )
          )}

        </div>


        {/* CONTENT */}

        <div className="min-w-0 flex-1">

          <div className="flex items-center gap-1.5">

            <p className="truncate text-[14px] font-medium text-[#526174]">
              {label}
            </p>

            {required && (
              <span className="text-[13px] text-[#e35d6a]">
                *
              </span>
            )}

          </div>


          {/* READING */}

          {reading ? (

            <div className="mt-2 flex items-center gap-2">

              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#356ae6] border-t-transparent" />

              <span className="text-[12px] font-medium text-[#356ae6]">
                Reading document details...
              </span>

            </div>

          ) : file ? (

            <div className="mt-1">

              <div className="flex items-center gap-1.5">

                <CheckCircle2
                  size={13}
                  className="shrink-0 text-[#3f9257]"
                />

                <p className="truncate text-[12px] font-medium text-[#3f7b50]">
                  {file.name}
                </p>

              </div>

              <p className="mt-0.5 text-[11px] text-[#84918b]">
                {(
                  file.size /
                  1024
                ).toFixed(1)}{" "}
                KB
              </p>

            </div>

          ) : (

            <div className="mt-1">

              <p className="text-[12px] font-normal text-[#98a3b1]">
                Click to upload a document
              </p>

              {helperText && (
                <p className="mt-1 text-[10px] font-medium text-[#6f86aa]">
                  ✦ {helperText}
                </p>
              )}

            </div>

          )}

        </div>


        {/* ACTION */}

        {reading ? (

          <span className="shrink-0 rounded-lg bg-[#eef4ff] px-2.5 py-1.5 text-[11px] font-medium text-[#356ae6]">
            Processing
          </span>

        ) : file ? (

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove();
            }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#9aa5b3] transition hover:bg-red-50 hover:text-red-500"
            title="Remove file"
          >
            <X size={16} />
          </button>

        ) : (

          <span className="hidden shrink-0 rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#7d8998] shadow-sm ring-1 ring-[#e5eaf0] sm:block">
            Browse
          </span>

        )}

      </label>


      <input
        id={inputId}
        type="file"
        className="hidden"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={(e) => {
          const selectedFile =
            e.target.files?.[0];

          if (selectedFile) {
            onFile(selectedFile);
          }

          e.target.value = "";
        }}
      />

    </div>
  );
};


/* =========================================================
   VISA INFORMATION
========================================================= */

const VisaInformation = ({
  visa,
  goingFrom,
  goingTo,
  travelDate,
  returnDate,
}) => {

  const title =
    visa?.about ||
    visa?.name ||
    `${goingTo || "Destination"} Visa`;

  const duration =
    visa?.duration || "—";

  const entry =
    visa?.entry || "—";

  const processingTime =
    visa?.processing_time ||
    "—";


  return (
    <section className="rounded-2xl border border-[#e1e7ed] bg-white p-5 shadow-[0_5px_24px_rgba(30,41,59,0.04)] sm:p-6">

      <div className="flex items-start gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f1f5f9] text-[#526174]">
          <FileText size={18} />
        </div>

        <div>

          <h3 className="text-[17px] font-semibold text-[#3b4859]">
            Visa information
          </h3>

          <p className="mt-1 text-[14px] font-normal leading-6 text-[#778495]">
            {title}
          </p>

        </div>

      </div>


      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

        <InfoBadge
          label="Entry"
          value={entry}
        />

        <InfoBadge
          label="Duration"
          value={duration}
        />

        <InfoBadge
          label="Processing"
          value={processingTime}
        />

        <InfoBadge
          label="Route"
          value={`${goingFrom || "India"} → ${
            goingTo ||
            "Destination"
          }`}
        />

      </div>


      {(travelDate ||
        returnDate) && (
        <div className="mt-5 grid gap-3 border-t border-[#edf0f3] pt-5 sm:grid-cols-2">

          {travelDate && (
            <InfoPoint
              icon={
                <CalendarDays
                  size={16}
                />
              }
              title="Travel date"
              description={formatDate(
                travelDate
              )}
            />
          )}

          {returnDate && (
            <InfoPoint
              icon={
                <CalendarDays
                  size={16}
                />
              }
              title="Return date"
              description={formatDate(
                returnDate
              )}
            />
          )}

        </div>
      )}


      <div className="mt-6 border-t border-[#edf0f3] pt-5">

        <h4 className="text-[14px] font-medium text-[#526174]">
          Before you continue
        </h4>


        <div className="mt-4 grid gap-4 md:grid-cols-3">

          <InfoPoint
            icon={
              <ShieldCheck
                size={15}
              />
            }
            title="Application validation"
            description="Required details are checked after submission."
          />

          <InfoPoint
            icon={
              <Clock3
                size={15}
              />
            }
            title="Processing time"
            description={`Expected processing time: ${processingTime}.`}
          />

          <InfoPoint
            icon={
              <Ban size={15} />
            }
            title="Payment terms"
            description="Cancellation and refund rules may apply after payment."
          />

        </div>

      </div>

    </section>
  );
};


/* =========================================================
   INFO BADGE
========================================================= */

const InfoBadge = ({
  label,
  value,
}) => {

  return (
    <div className="rounded-xl border border-[#e5eaf0] bg-[#fafbfc] px-3.5 py-3">

      <p className="text-[11px] font-medium text-[#9aa5b3]">
        {label}
      </p>

      <p className="mt-1 line-clamp-2 text-[13px] font-medium leading-5 text-[#526174]">
        {value}
      </p>

    </div>
  );
};


/* =========================================================
   INFO POINT
========================================================= */

const InfoPoint = ({
  icon,
  title,
  description,
}) => {

  return (
    <div className="flex items-start gap-2.5">

      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f1f5f9] text-[#68778a]">
        {icon}
      </div>

      <div>

        <p className="text-[13px] font-medium text-[#526174]">
          {title}
        </p>

        <p className="mt-0.5 text-[12px] font-normal leading-5 text-[#8793a2]">
          {description}
        </p>

      </div>

    </div>
  );
};


/* =========================================================
   INSURANCE CARD
========================================================= */

const InsuranceCard = ({
  insurance,
  setInsurance,
  required,
  travelersCount,
  insurancePerTraveler,
  insuranceTotal,
}) => {

  return (
    <section className="rounded-2xl border border-[#e1e7ed] bg-white p-5 shadow-[0_5px_24px_rgba(30,41,59,0.04)] sm:p-6">

      <div className="flex items-center justify-between gap-4">

        <div className="flex items-start gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f1f7ff] text-[#356ae6]">
            <ShieldCheck
              size={18}
            />
          </div>

          <div>

            <div className="flex items-center gap-2">

              <h3 className="text-[16px] font-semibold text-[#3b4859]">
                Travel insurance
              </h3>

              {required && (
                <span className="text-[12px] text-[#e35d6a]">
                  Required
                </span>
              )}

            </div>

            <p className="mt-1 max-w-xl text-[13px] font-normal leading-5.5 text-[#8490a0]">
              Add basic travel protection to your application.
            </p>

          </div>

        </div>


        <button
          type="button"
          role="switch"
          aria-checked={insurance}
          onClick={() =>
            setInsurance(
              !insurance
            )
          }
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            insurance
              ? "bg-[#356ae6]"
              : "bg-[#d8dee6]"
          }`}
        >

          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
              insurance
                ? "left-6"
                : "left-1"
            }`}
          />

        </button>

      </div>


      {insurance && (
        <div className="mt-5 flex items-center justify-between rounded-xl border border-[#e1e9f8] bg-[#f7f9ff] px-4 py-3">

          <div>

            <p className="text-[12px] font-normal text-[#778496]">
              ₹{insurancePerTraveler} ×{" "}
              {travelersCount} traveler
              {travelersCount > 1
                ? "s"
                : ""}
            </p>

            <p className="mt-0.5 text-[14px] font-medium text-[#526174]">
              Insurance added
            </p>

          </div>

          <p className="text-[15px] font-semibold text-[#3d506c]">
            ₹{formatAmount(
              insuranceTotal
            )}
          </p>

        </div>
      )}

    </section>
  );
};


/* =========================================================
   PAYMENT BUTTON
========================================================= */

const PaymentButton = ({
  active,
  onClick,
  icon,
  label,
}) => {

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[52px] items-center justify-center gap-2 rounded-xl border text-[13px] font-medium transition ${
        active
          ? "border-[#356ae6] bg-[#f3f7ff] text-[#356ae6]"
          : "border-[#e1e7ed] bg-white text-[#718096] hover:border-[#cbd5e1] hover:bg-[#fafbfc]"
      }`}
    >
      {icon}
      {label}
    </button>
  );
};


/* =========================================================
   SUMMARY ROW
========================================================= */

const SummaryRow = ({
  label,
  value,
}) => {

  return (
    <div className="flex items-center justify-between gap-4">

      <span className="text-[13px] font-normal text-[#7b8796]">
        {label}
      </span>

      <span className="text-[13px] font-medium text-[#526174]">
        {value}
      </span>

    </div>
  );
};


/* =========================================================
   PROGRESS STEP
========================================================= */

const ProgressStep = ({
  number,
  label,
  active = false,
  complete = false,
}) => {

  return (
    <div className="flex min-w-[65px] flex-col items-center">

      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-medium ${
          active
            ? "bg-[#356ae6] text-white"
            : complete
            ? "bg-[#eaf1ff] text-[#356ae6]"
            : "bg-[#edf1f5] text-[#8995a4]"
        }`}
      >

        {complete ? (
          <CheckCircle2
            size={14}
          />
        ) : (
          number
        )}

      </div>

      <span
        className={`mt-1.5 whitespace-nowrap text-[10px] font-medium ${
          active
            ? "text-[#356ae6]"
            : "text-[#8d98a6]"
        }`}
      >
        {label}
      </span>

    </div>
  );
};


/* =========================================================
   ICON HELPERS
========================================================= */

const LogInIcon = () => (
  <LogIn size={16} />
);


const LogOutIcon = () => (
  <LogOut size={16} />
);


/* =========================================================
   FORMATTERS
========================================================= */

const formatAmount = (
  amount
) => {
  return Number(
    amount || 0
  ).toLocaleString("en-IN");
};


const formatDate = (
  date
) => {

  if (!date) {
    return "—";
  }

  const parsed =
    new Date(date);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return date;
  }

  return parsed.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};


export default TravelerDetails;
