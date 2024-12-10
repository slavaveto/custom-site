import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import emailjs from "@emailjs/browser";

import { AppContext } from "@/context/app-context-provider";
import { LoadingSpinner } from "@/app/components/loading-spinner";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

export const MessageForm = ({page}: {page: string}) => {
  const { isDarkMode } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    someSelect: "",
    telegram: "",
    message: "",
    page: page,
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData);

    // Validate email format
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
      setFormErrors((prev) => ({
        ...prev,
        email: emailRegex.test(value) ? "" : "Invalid email format",
      }));
    }
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
          someSelect: formData.someSelect,
          telegram: formData.telegram,
          message: formData.message,
          page: formData.page
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

  const isFormValid =
    Object.values(formData).every((value) => value.trim() !== "") &&
    !formErrors.email;

  const commonSlotProps = {
    input: {
      style: { color: isDarkMode ? "white" : "black" },
    },
    inputLabel: {
      style: { color: isDarkMode ? "silver" : "black" },
    },
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
          <div className="mt-4 bg-gray-200 pt-4 pb-6 px-2 border-l-2 border-gray-400 text-sm text-gray-700 dark:bg-gray-600 dark:text-white">
            To send me a message, please fill in all the form fields and click
            the "Send" button.
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col space-y-4 dark:text-white"
          >
            <Box>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                //slotProps={commonSlotProps}
              />
            </Box>

            <Box>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                error={formErrors.email !== ""}
                helperText={formErrors.email}
                //slotProps={commonSlotProps}
              />
            </Box>

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  //style={{ color: isDarkMode ? "white" : "black" }}
                >
                  Some select
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.someSelect}
                  label="Some Select"
                  name="someSelect"
                  onChange={handleChange}
                  //style={{ color: isDarkMode ? "white" : "black" }}
                >
                  <MenuItem value={"Select1"}>Select1</MenuItem>
                  <MenuItem value={"Select2"}>Select2</MenuItem>
                  <MenuItem value={"Select3"}>Select3</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <TextField
                id="telegram"
                label="Telegram"
                variant="outlined"
                name="telegram"
                value={formData.telegram}
                onChange={handleChange}
                required
                fullWidth
                //slotProps={commonSlotProps}
              />
            </Box>

            <Box>
              <TextField
                id="message"
                label="Message"
                variant="outlined"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                fullWidth
                multiline
                rows={4}
                //slotProps={commonSlotProps}
              />
            </Box>

            <Box display="flex" justifyContent="flex-end">
              {/* <Button
                type="submit"
                variant="outlined"
                className="w-[170px] dark:text-white"
                sx={{
                  textTransform: "none", // Prevent uppercase text
                }}
                disabled={!isFormValid || isLoading} // Disable if form is invalid or loading
              >
                {isLoading ? "Sending..." : "Send"}
              </Button> */}

              <button
                type="submit"
                className="btn btn-wide btn-outline btn-sm max-w-[170px] border-gray-300 text-gray-400 self-end"
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </Box>
            {isLoading && <LoadingSpinner />}
          </form>
        </>
      )}
    </div>
  );
};
