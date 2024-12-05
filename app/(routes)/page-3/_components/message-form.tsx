import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import emailjs from "@emailjs/browser";

import { LoadingSpinner } from "@/app/components/loading-spinner";

export const MessageForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telegram: "",
    message: "",
  });

  console.log(process.env.NEXT_PUBLIC_EMAILJS_YOUR_SERVICE_ID);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send the email first using EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_YOUR_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_YOUR_TEMPLATE_ID!,
        {
          name: formData.name,
          email: formData.email,
          telegram: formData.telegram,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      // If EmailJS was successful, proceed to store the message in the database
      const response = await axios.post("/api/messages", formData);
      if (response.status === 200) {
        setMessageSent(true);
        toast.success("Message sent successfully!");
      } else {
        toast.error("Failed to store the message. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to send the message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {messageSent && (
        <div className="mt-16 bg-gray-200 pt-4 pb-6 px-2 border-l-4 border-green-400 text-sm text-gray-700">
          Horray! <br />
          Your message has been successfully sent!
        </div>
      )}

      {!messageSent && (
        <>
          <div className="mt-4 bg-gray-200 pt-4 pb-6 px-2 border-l-2 border-gray-400 text-sm text-gray-700">
            To send me a message, please fill in all the form fields and click
            the "Send" button.
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col space-y-4"
          >
            {isLoading && <LoadingSpinner />}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Name*"
              className="w-full p-2 border border-gray-300 rounded placeholder-gray-400 placeholder:text-sm"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email*"
              className="w-full p-2 border border-gray-300 rounded placeholder-gray-400 placeholder:text-sm"
            />

            <input
              type="text"
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              required
              placeholder="Telegram*"
              className="w-full p-2 border border-gray-300 rounded placeholder-gray-400 placeholder:text-sm"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Message*"
              rows={4}
              className="w-full p-2 border border-gray-300 rounded placeholder-gray-400 placeholder:text-sm"
            ></textarea>

            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-wide btn-outline btn-sm max-w-[170px] border-gray-300 text-gray-400 self-end"
              >
                Send
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
