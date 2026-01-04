"use client";

import { getEvent, getFlyerImages } from "@/app/services/events";
import { ApiEvent, Xevent } from "@/app/types/eventTypes";
import {
  formatLocationToSearchParam,
  mapApiEventsToXevents,
  formatDatetime,
  formatPrice,
} from "@/app/utils/utils";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { createNewTicket } from "../services/tickets";
import { useAuth } from "../context/AuthContext";
import { Ticket } from "../types/ticketTypes";
import { User } from "../types/userTypes";
import LoadingPage from "../components/LoadingPage";
import ErrorPage from "../components/ErrorPage";

export default function Purchase() {
  const { user } = useAuth();
  const router = useRouter();
  const [event, setEvent] = useState<Xevent>();
  const [ticket, setTicket] = useState<Ticket>();
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [success, setSuccess] = useState(false);
  const [attendees, setAttendees] = useState(1);
  const [maxAttendees, setMaxAttendees] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [cardData, setCardData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });
  const searchParams = useSearchParams();
  const progressItems = [
    { id: 1, text: "Tickets" },
    { id: 2, text: "Payment" },
    { id: 3, text: "Confirmation" },
  ];

  useEffect(() => {
    const eventId = searchParams.get("event");

    const loadEvent = async () => {
      try {
        setIsLoading(true);
        const event = await getEvent(eventId);

        if (event != null) {
          let eventArray: ApiEvent[] = [event];
          let flyerPaths: string[] = [event.flyerPath];

          const eventFlyer = await getFlyerImages(flyerPaths);

          const mappedEvents = mapApiEventsToXevents(eventArray, eventFlyer);
          const loadedEvent = mappedEvents[0];
          setEvent(loadedEvent);
        }
      } catch (error) {
        console.error("Failed to fecth event with ID = ", eventId, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvent();
  }, []);

  if (isLoading) {
    return <LoadingPage text="Loading event details..." />;
  }

  if (isProcessingPayment) {
    return <ProcessingPaymentPage />;
  }

  if (event && user) {
    const processPurchase = async () => {
      try {
        setIsProcessingPayment(true);

        if (user.id && user.accountType == "client") {
          const tmpTicket = await createNewTicket(user.id, event.id, attendees);

          const mappedTicket = {
            id: tmpTicket.id,
            status: tmpTicket.status,
            purchasePrice: tmpTicket.purchasePrice,
            attendees: tmpTicket.attendees,
            order: tmpTicket.order,
            event: event,
          };

          setTicket(mappedTicket);
          setSuccess(true);
        }
      } catch (error) {
        setSuccess(false);
      } finally {
        setIsProcessingPayment(false);
      }
    };

    const renderCurrentStep = () => {
      switch (currentStep) {
        case 1:
          return (
            <SelectTickets
              event={event}
              attendees={attendees}
              setAttendees={setAttendees}
              maxAttendees={maxAttendees}
              setMaxAttendees={setMaxAttendees}
              setCurrentStep={setCurrentStep}
            />
          );
        case 2:
          return (
            <PaymentPage
              event={event}
              attendees={attendees}
              cardData={cardData}
              setCardData={setCardData}
              setCurrentStep={setCurrentStep}
              processPurchase={processPurchase}
            />
          );
        case 3:
          if (success && ticket) {
            return (
              <ConfirmationPage
                ticket={ticket}
                user={user}
                cardholderName={cardData.cardholderName}
              />
            );
          } else {
            return <ErrorPage showHomePage={true}/>;
          }
      }
    };

    return (
      <>
        {/* Header */}
        <section className="flex justify-center items-center bg-blue text-white h-15">
          <div className="flex absolute left-0 mx-3 gap-2">
            <button
              onClick={() => {
                if (currentStep > 1) {
                  setCurrentStep(currentStep - 1);
                } else {
                  window.location.href = "/";
                }
              }}
              className="p-1 bg-darker-blue rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Image
                src="/icons/go_back_white.svg"
                alt="Go Back"
                width={30}
                height={30}
              ></Image>
            </button>
            <Link
              href="/"
              className="p-1 bg-darker-blue rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Image
                src="/icons/home.svg"
                alt="Home"
                width={30}
                height={30}
              ></Image>
            </Link>
          </div>
          <ul className="flex gap-2">
            {progressItems.map((item) => (
              <li
                key={item.id}
                className={`flex items-center gap-2 ${
                  item.id == currentStep
                    ? "font-bold underline underline-offset-5"
                    : null
                }`}
              >
                {item.text}
                {item.id != progressItems.length ? (
                  <img src="/icons/next_arrow.svg" alt="next" width={20} />
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        {/* Main section */}
        <main className="flex min-h-150 p-8 mx-45">{renderCurrentStep()}</main>
      </>
    );
  } else {
    // Error page. Shown when fetching fails
    return <ErrorPage showHomePage={true} />;
  }
}

function ProcessingPaymentPage() {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-blue border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xl text-gray-600">Processing payment...</span>
      </div>
    </div>
  );
}

function EventInfo(event: Xevent) {
  const { date, time } = formatDatetime(event.startTime);

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className="flex flex-col flex-1">
          <span className="text-4xl funnel-text font-semibold text-dark-blue pb-2">
            {event.name}
          </span>
          <span className="text-xl">{event.description}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-4xl">{formatPrice(event.price)} MXN</span>
          <span className="text-xl">per ticket</span>
        </div>
      </div>

      <hr className="w-full my-4" />

      <div className="flex flex-col">
        <span className="funnel-text text-2xl font-semibold text-gray-700 pb-1">
          {date + " - " + time}
        </span>
        <a
          href={`https://www.google.com/maps/search/${formatLocationToSearchParam(
            event.location.city,
            event.location.address
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl hover:underline"
        >{`${event.location.city} — ${event.location.address}`}</a>
      </div>
      <hr className="w-8 my-7 border-blue border-2" />
      <div>
        <p className="pb-1 font-semibold text-xl text-gray-700">On stage </p>
        <ul>
          {event.artists.map((artist) => (
            <li key={artist} className="text-gray-700 pb-0.5 text-lg">
              {artist}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface SelectTicketsProps {
  event: Xevent;
  attendees: number;
  setAttendees: (arg0: number) => void;
  maxAttendees: boolean;
  setMaxAttendees: (arg0: boolean) => void;
  setCurrentStep: (arg0: number) => void;
}

function SelectTickets({
  event,
  attendees,
  setAttendees,
  maxAttendees,
  setMaxAttendees,
  setCurrentStep,
}: SelectTicketsProps) {
  return (
    <>
      {/* Event image */}
      <section>
        <Image
          src={`data:image/jpeg;base64,${event.flyer.img}`}
          alt={event ? event.flyer.alt : "Flyer"}
          width={400}
          height={400}
          className="rounded-lg object-cover w-60 md:w-80"
        />
      </section>

      {/* Event details and info */}
      <section className="flex-1 px-8 items-start">
        <EventInfo {...event} />

        <form className="flex flex-col gap-3 pt-8">
          <label
            htmlFor="attendees_input"
            className="block text-lg font-semibold text-gray-700 tracking-wide"
          >
            Number of tickets
          </label>

          <div className="flex items-center justify-between w-40 px-2 py-1 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-300">
            <button
              type="button"
              onClick={() => {
                setAttendees(attendees - 1);
                setMaxAttendees(false);
              }}
              disabled={attendees <= 1}
              className={`p-3 rounded-full transition-colors duration-200 group ${
                attendees <= 1
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-gray-100 active:bg-gray-200"
              }`}
            >
              <Minus size={16} strokeWidth={3} />
            </button>

            <input
              id="attendees_input"
              type="text"
              className="w-12 text-center text-xl font-bold text-gray-800 bg-transparent border-none focus:ring-0 outline-none p-0"
              value={attendees}
              onChange={(e) => {
                const val = e.target.value;

                if (val === "") {
                  setAttendees(0);
                  setMaxAttendees(false);
                  return;
                }

                // Only process if it is a number
                if (/^[0-9\b]+$/.test(val)) {
                  const numVal = Number(val);

                  if (numVal > 10) {
                    setAttendees(10); // Cap the value at 10
                    setMaxAttendees(true); // Show warning
                  } else {
                    setAttendees(numVal);
                    setMaxAttendees(false); // Hide warning if they delete back to safe range
                  }
                }
              }}
            />

            <button
              type="button"
              onClick={() => {
                if (attendees >= 10) {
                  setMaxAttendees(true);
                } else {
                  setAttendees(attendees + 1);
                  setMaxAttendees(false);
                }
              }}
              className={`p-3 rounded-full transition-colors duration-200 ${
                attendees >= 10
                  ? "opacity-50 cursor-not-allowed" // Optional visual cue
                  : "hover:bg-gray-100 active:bg-gray-200"
              }`}
            >
              <Plus size={16} strokeWidth={3}></Plus>
            </button>
          </div>

          {maxAttendees ? (
            <span className="text-red-500">
              You can only purchase a maximum of 10 tickets per order.
            </span>
          ) : null}
        </form>
      </section>

      {/* Order summary */}
      <section className="bg-gray-50 rounded-lg p-6 w-100 h-fit sticky top-8 border border-gray-200">
        <h3 className="text-2xl font-semibold text-blue mb-4">Order Summary</h3>

        <div className="space-y-4">
          <div className="flex justify-between text-lg">
            <span className="text-gray-700">{event.name}</span>
          </div>

          <hr className="border-gray-300" />

          <div className="flex justify-between text-lg">
            <span className="text-gray-700">Price per ticket</span>
            <span className="font-semibold">
              {formatPrice(event.price)} MXN
            </span>
          </div>

          <div className="flex justify-between text-lg">
            <span className="text-gray-700">Quantity</span>
            <span className="font-semibold">{attendees}</span>
          </div>

          <hr className="border-gray-300" />

          <div className="flex justify-between text-2xl">
            <span className="font-semibold text-gray-800">Total</span>
            <span className="font-bold text-blue">
              {formatPrice(event.price * attendees)} MXN
            </span>
          </div>
        </div>

        <button
          type="submit"
          onClick={() => setCurrentStep(2)}
          className="w-full mt-6 bg-blue text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Proceed to Payment
        </button>
      </section>
    </>
  );
}

interface PaymentPageProps {
  event: Xevent;
  attendees: number;
  cardData: {
    cardholderName: string;
    cardNumber: string;
    expiryDate: string;
    cvc: string;
  };
  setCardData: (data: {
    cardholderName: string;
    cardNumber: string;
    expiryDate: string;
    cvc: string;
  }) => void;
  setCurrentStep: (arg0: number) => void;
  processPurchase: () => void;
}

function PaymentPage({
  event,
  attendees,
  cardData,
  setCardData,
  setCurrentStep,
  processPurchase: processPurchase,
}: PaymentPageProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!cardData.cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required";
    }

    if (!cardData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(cardData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!cardData.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      newErrors.expiryDate = "Format should be MM/YY";
    }

    if (!cardData.cvc.trim()) {
      newErrors.cvc = "CVC is required";
    } else if (!/^\d{3,4}$/.test(cardData.cvc)) {
      newErrors.cvc = "CVC must be 3 or 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      processPurchase();
      setCurrentStep(3);
    }
  };

  const handleCardNumberChange = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, "");
    // Add space every 4 digits
    const formatted = cleaned
      .slice(0, 16)
      .replace(/(\d{4})/g, "$1 ")
      .trim();
    setCardData({ ...cardData, cardNumber: formatted });
  };

  const handleExpiryChange = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, "");
    // Format as MM/YY
    if (cleaned.length <= 4) {
      const formatted =
        cleaned.length > 2
          ? `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
          : cleaned;
      setCardData({ ...cardData, expiryDate: formatted });
    }
  };

  const handleCVCChange = (value: string) => {
    // Only allow digits up to 4
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    setCardData({ ...cardData, cvc: cleaned });
  };

  return (
    <div className="w-full">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-dark-blue mb-8">
          Payment Information
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Cardholder Name */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold text-gray-700">
              Cardholder Name
            </label>
            <input
              type="text"
              value={cardData.cardholderName}
              onChange={(e) =>
                setCardData({ ...cardData, cardholderName: e.target.value })
              }
              placeholder="John Doe"
              className={`px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all ${
                errors.cardholderName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.cardholderName && (
              <span className="text-red-500 text-sm">
                {errors.cardholderName}
              </span>
            )}
          </div>

          {/* Card Number */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              value={cardData.cardNumber}
              onChange={(e) => handleCardNumberChange(e.target.value)}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={`px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all ${
                errors.cardNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.cardNumber && (
              <span className="text-red-500 text-sm">{errors.cardNumber}</span>
            )}
          </div>

          {/* Expiry Date and CVC */}
          <div className="flex gap-6">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-lg font-semibold text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                value={cardData.expiryDate}
                onChange={(e) => handleExpiryChange(e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
                className={`px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all ${
                  errors.expiryDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.expiryDate && (
                <span className="text-red-500 text-sm">
                  {errors.expiryDate}
                </span>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <label className="text-lg font-semibold text-gray-700">CVC</label>
              <input
                type="text"
                value={cardData.cvc}
                onChange={(e) => handleCVCChange(e.target.value)}
                placeholder="123"
                maxLength={4}
                className={`px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all ${
                  errors.cvc ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.cvc && (
                <span className="text-red-500 text-sm">{errors.cvc}</span>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mt-6">
            <h3 className="text-xl font-semibold text-blue mb-6">
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-lg">
                <span className="text-gray-700 font-semibold">Event </span>
                <span className="font-semibold">{event.name}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-700">Price per ticket</span>
                <span className="font-semibold">
                  {formatPrice(event.price)} MXN
                </span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-700">Quantity</span>
                <span className="font-semibold">{attendees}</span>
              </div>
              <hr className="border-gray-300" />
              <div className="flex justify-between text-xl">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="font-bold text-blue">
                  {formatPrice(event.price * attendees)} MXN
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-8 bg-blue text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Confirm Purchase
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Your card information is secure and will not be stored.
        </p>
      </div>
    </div>
  );
}

interface ConfirmationPageProps {
  user: User;
  ticket: Ticket;
  cardholderName: string;
}

function ConfirmationPage({
  user,
  ticket,
  cardholderName,
}: ConfirmationPageProps) {
  const { date, time } = formatDatetime(ticket.event.startTime);

  return (
    <div className="w-full">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-dark-blue mb-2">
            Purchase Confirmed!
          </h2>
          <p className="text-lg text-gray-600">
            Thank you for your purchase, {user.name}
          </p>
        </div>

        {/* Confirmation Details */}
        <div className="bg-blue-50 rounded-lg p-8 border-2 border-blue mb-8">
          <div className="mb-6">
            <p className="text-gray-600 text-sm mb-1">Confirmation Number</p>
            <p className="text-2xl font-bold text-blue">{ticket.id}</p>
          </div>

          <hr className="border-blue-200 mb-6" />

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-700">Event</span>
              <span className="font-semibold">{ticket.event.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-700">Date & Time</span>
              <span className="font-semibold">
                {date} at {time}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-700">Location</span>
              <span className="font-semibold">
                {ticket.event.location.city} — {ticket.event.location.address}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-700">Number of Tickets</span>
              <span className="font-semibold">{ticket.attendees}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-700">Price per Ticket</span>
              <span className="font-semibold">
                {formatPrice(ticket.order.totalAmount / ticket.attendees)} MXN
              </span>
            </div>

            <hr className="border-blue-200" />

            <div className="flex justify-between text-lg">
              <span className="font-semibold text-gray-800">Total Paid</span>
              <span className="font-bold text-blue">
                {formatPrice(ticket.order.totalAmount)} MXN
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link
            href="/"
            className="flex-1 bg-blue text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-center"
          >
            Back to Home
          </Link>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Print Confirmation
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          A confirmation email has been sent to your registered email address.
        </p>
      </div>
    </div>
  );
}
