"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from 'axios'; // Import Axios
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import local from "next/font/local";
import { useState } from "react";


// Validation schema with updated fields
const formSchema = z.object({
  id: z.string().optional(), // hidden field, not required initially
  catID: z.string().nullable(),
  typeID: z.string().nullable(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  datetimeLocal: z.string().min(1, "Start date and time is required"), // start (date-time picker)
  datetimeLocal2: z.string().min(1, "End date and time is required"), // end (date-time picker)
  datetimeLocal3: z.string().optional(), // optional date-time picker
  datetimeLocal4: z.string().optional(), // optional date-time picker
  imgURL: z.string().url("Image must be a valid URL"),
  registration_by: z.enum(["us", "yourself"]),
  event: z.string().url("Link must be a valid URL").optional(),
  eventLink: z.string().url("Event link must be a valid URL").optional(),
  status1: z.enum(["DRAFT", "PENDING"]), // Hidden field for status
  status2: z.enum(["DRAFT", "PENDING"]), // Hidden field for status
});



export default function Home() {
  const [submitType, setSubmitType] = useState<"PENDING" | "DRAFT">("PENDING");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      catID: "", // Initially null for numeric fields
      typeID: "", // Initially null for numeric fields
      title: "",
      description: "",
      datetimeLocal: "",
      datetimeLocal2: "",
      datetimeLocal3: "",
      datetimeLocal4: "",
      imgURL: "",
      registration_by: "us",
      event: "",
      eventLink: "",
      status1: "PENDING", // Default status set to DRAFT
      status2: "DRAFT", // Default status set to DRAFT
    },
  });

  const registrationBy = form.watch("registration_by");

  
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const status = submitType; // 'PENDING' for Publish, 'DRAFT' for Save
      values.status = status;

      // Correctly using localStorage to store title
      const title = values.title; // Assuming values.title exists
      localStorage.setItem('title', title); // Set title in local storage

      const status1 = values.status1; // Assuming values.title exists
      localStorage.setItem('status1', status1); // Set title in local storage

      const status2 = values.status2;
      localStorage.setItem('status2', status2);

      const catID = values.catID;
      localStorage.setItem('catID', catID);

      const response = await axios.get(`http://localhost:3000/Form?${queryParams}`);
      
      console.log('Response from API:', response.config);
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  };

  return (
    <main className="flex min-h-screen bg-stone-950 text-white flex-col items-center justify-between p-16">
      <div className="pb-2 w-full">
        <div className="w-28 cursor-pointer bg-blue-400 p-1 px-6 mx-6 border rounded-lg hover:bg-blue-700">
          <Link className="flex" href="http://localhost:3000">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#FFFFFF" fill="white">
              <path d="M4.80823 9.44118L6.77353 7.46899C8.18956 6.04799 8.74462 5.28357 9.51139 5.55381C10.4675 5.89077 10.1528 8.01692 10.1528 8.73471C11.6393 8.73471 13.1848 8.60259 14.6502 8.87787C19.4874 9.78664 21 13.7153 21 18C19.6309 17.0302 18.2632 15.997 16.6177 15.5476C14.5636 14.9865 12.2696 15.2542 10.1528 15.2542C10.1528 15.972 10.4675 18.0982 9.51139 18.4351C8.64251 18.7413 8.18956 17.9409 6.77353 16.5199L4.80823 14.5477C3.60275 13.338 3 12.7332 3 11.9945C3 11.2558 3.60275 10.6509 4.80823 9.44118Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
            <p>Home</p>
          </Link>
        </div>
        <div className="w-full text-center text-4xl">Event Form</div>
      </div>


      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
          {/* ID (Hidden) */}
          <input type="hidden" {...form.register("id")} />

          {/* Category ID */}
          <FormField
            control={form.control}
            name="catID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category ID</FormLabel>
                <FormControl>
                  <Input type="catID" placeholder="Category ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type ID */}
          <FormField
            control={form.control}
            name="typeID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type ID</FormLabel>
                <FormControl>
                  <Input type="typeID" placeholder="Type ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input type="title" placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input type="description" placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Start Time (Date-Time Picker) */}
          <FormField
            control={form.control}
            name="datetimeLocal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date & Time</FormLabel>
                <FormControl>
                  <Input type="datetimeLocal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* End Time (Date-Time Picker) */}
          <FormField
            control={form.control}
            name="datetimeLocal2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date & Time</FormLabel>
                <FormControl>
                  <Input type="datetimeLocal2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Registration Start (Optional Date-Time Picker) */}
          <FormField
            control={form.control}
            name="datetimeLocal3"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Start Date & Time (Optional)</FormLabel>
                <FormControl>
                  <Input type="datetimeLocal3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Registration End (Optional Date-Time Picker) */}
          <FormField
            control={form.control}
            name="datetimeLocal4"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration End Date & Time (Optional)</FormLabel>
                <FormControl>
                  <Input type="datetimeLocal4" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image URL */}
          <FormField
            control={form.control}
            name="imgURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input type="imgURL" placeholder="Image URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>   
            )}
          />

          {/* Registration By */}
          <FormField
            control={form.control}
            name="registration_by"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration by</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select registration method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem typeof="registration_by" value="us">By Us</SelectItem>
                    <SelectItem typeof="registration_by" value="yourself">By Yourself</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Registration Link (only if "yourself" is selected) */}
          {registrationBy === "yourself" && (
            <FormField
              control={form.control}
              name="event"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Link</FormLabel>
                  <FormControl>
                    <Input type="event" placeholder="Link for registration" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Event Link (only if "us" is selected) */}
          {registrationBy === "us" && (
            <FormField
              control={form.control}
              name="eventLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Link (Optional)</FormLabel>
                  <FormControl>
                    <Input type="eventLink" placeholder="Link to event" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

           {/* Status selection logic (hidden but managed by state) */}
           <FormField control={form.control} name="status" render={({ field }) => null} />

          {/* Submit Button */}
          <span className="gap-4">
            <Button
              type="submit"
              onClick={() => setSubmitType("PENDING")}
              className="w-[45%] hover:bg-slate-800 mx-2"
            >
              <Link href="http://localhost:3000">
                Publish
              </Link>
            </Button>

            <Button
              type="submit"
              onClick={() => setSubmitType("DRAFT")}
              className="w-[45%] hover:bg-slate-800 mx-2"
            >
              <Link href="http://localhost:3000">
                Save
              </Link>
            </Button>
          </span>
        </form>
      </Form>
    </main>
  );
}


// config.data