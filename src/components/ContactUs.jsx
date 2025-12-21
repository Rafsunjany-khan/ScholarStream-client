import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const ContactSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I apply for a scholarship?",
      answer:
        "Browse scholarships, view details, and click the Apply button. Complete payment to submit your application.",
    },
    {
      question: "Is the application fee refundable?",
      answer:
        "Application fees are non-refundable once the application is submitted.",
    },
    {
      question: "Can I edit my application after submission?",
      answer:
        "You can edit your application only if the status is still marked as Pending.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-800">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md border border-gray-200">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-6 py-5 font-semibold text-left text-gray-800">
                  {faq.question}
                  <span className="text-2xl font-bold">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-5 text-base text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-800"> Contact Us </h3>

            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              Have questions about scholarships, applications, or payments?
              Our support team is here to help you anytime.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-primary text-xl" />
                <p className="text-lg text-gray-700">
                  <span className="font-semibold text-gray-900">Email:</span>{" "}
                  support@scholarstream.com
                </p>
              </div>

              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-primary text-xl" />
                <p className="text-lg text-gray-700">
                  <span className="font-semibold text-gray-900">Phone:</span>{" "}
                  +880 1701-983377
                </p>
              </div>

              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-primary text-xl" />
                <p className="text-lg text-gray-700">
                  <span className="font-semibold text-gray-900">Address:</span>{" "}
                  Dhaka, Bangladesh
                </p>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <FaClock className="text-primary text-xl" />
                <p className="text-lg text-gray-700">
                  <span className="font-semibold text-gray-900">
                    Support Hours:
                  </span>{" "}
                  Sun – Thu, 9:00 AM – 6:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
