import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import emailjs from "@emailjs/browser";

import { LoadingSpinner } from "@/app/components/loading-spinner";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

export const MessageForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    someSelect: "",
    telegram: "",
    message: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData);
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
              />
            </Box>

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Some select
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.someSelect}
                  label="Some Select"
                  name="someSelect"
                  onChange={handleChange}
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
              />
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="outlined"
                className="w-[170px]"
                sx={{
                  textTransform: "none", // Prevent uppercase text
                }}
              >
                Send
              </Button>
            </Box>
            {isLoading && <LoadingSpinner />}
          </form>
        </>
      )}
    </div>
  );
};
