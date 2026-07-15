"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "../../layout";
import { requestGQL } from "../../../../lib/graphql-client";
import { CREATE_PROPERTY_MUTATION } from "../../../../graphql/operations";
import { uploadToSupabase } from "../../../../lib/supabase";
import { Button } from "../../../../components/ui/button";
import { toast } from "sonner";
import {
  REGIONS,
  PROPERTY_TYPES,
  PARKING_OPTIONS,
} from "../../../../lib/constants";
import { useForm } from "react-hook-form";
import { Form } from "../../../../components/ui/form";
import {
  InputWrapper,
  SelectWrapper,
  TextareaWrapper,
} from "../../../../components/ui/form-wrappers";
import {
  Plus,
  Image as ImageIcon,
  FileText,
  Building2,
  MapPin,
  Sparkles,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Link from "next/link";

export default function NewPropertyPage() {
  const { user } = useUser();
  const router = useRouter();

  // React Hook Form initialization
  const form = useForm({
    defaultValues: {
      title: "",
      region: "Greater Accra",
      district: "",
      propertyType: "Apartment",
      price: 0,
      bedrooms: "3",
      bathrooms: "2",
      size: "120",
      parking: "Yes",
      description: "",
    },
  });

  const watchedValues = form.watch();

  // File Upload States
  const [coverUrl, setCoverUrl] = useState("");
  const [roomUrl, setRoomUrl] = useState("");
  const [kitchenUrl, setKitchenUrl] = useState("");
  const [bathroomUrl, setBathroomUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfName, setPdfName] = useState("");

  // Individual image uploading loaders
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingRoom, setUploadingRoom] = useState(false);
  const [uploadingKitchen, setUploadingKitchen] = useState(false);
  const [uploadingBathroom, setUploadingBathroom] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // File input refs
  const coverInputRef = useRef<HTMLInputElement>(null);
  const roomInputRef = useRef<HTMLInputElement>(null);
  const kitchenInputRef = useRef<HTMLInputElement>(null);
  const bathroomInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  // Select dropdown arrays mapping
  const regionOptions = REGIONS.map((r) => ({ label: r, value: r }));
  const typeOptions = PROPERTY_TYPES.map((t) => ({ label: t, value: t }));
  const parkingOptions = PARKING_OPTIONS;

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "cover" | "room" | "kitchen" | "bathroom" | "pdf",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (type === "cover") setUploadingCover(true);
      if (type === "room") setUploadingRoom(true);
      if (type === "kitchen") setUploadingKitchen(true);
      if (type === "bathroom") setUploadingBathroom(true);
      if (type === "pdf") setUploadingPdf(true);

      const url = await uploadToSupabase(file);

      if (type === "cover") setCoverUrl(url);
      if (type === "room") setRoomUrl(url);
      if (type === "kitchen") setKitchenUrl(url);
      if (type === "bathroom") setBathroomUrl(url);
      if (type === "pdf") {
        setPdfUrl(url);
        setPdfName(file.name);
      }

      toast.success(`${file.name} uploaded successfully!`);
    } catch (err: any) {
      console.error(err);
      toast.error(`Upload failed: ${err.message}`);
    } finally {
      if (type === "cover") setUploadingCover(false);
      if (type === "room") setUploadingRoom(false);
      if (type === "kitchen") setUploadingKitchen(false);
      if (type === "bathroom") setUploadingBathroom(false);
      if (type === "pdf") setUploadingPdf(false);
    }
  };

  const onSubmit = async (values: any) => {
    if (!coverUrl) {
      toast.error("Please upload at least a Cover Image for the listing");
      return;
    }

    try {
      setIsSubmitting(true);
      const input = {
        title: values.title,
        type: values.propertyType,
        location: values.district + ", " + values.region,
        region: values.region,
        district: values.district,
        price: Number(values.price),
        bedrooms: values.bedrooms + " Beds",
        bathrooms: values.bathrooms + " Baths",
        size: values.size,
        parking: values.parking,
        about: values.description,
        amenities: ["Electricity", "Water", "Gated Community"],
        image: coverUrl,
        kitchenImage: kitchenUrl || coverUrl,
        bedroomImage: roomUrl || coverUrl,
        bathroomImage: bathroomUrl || coverUrl,
        agreementUrl: pdfUrl || null,
      };

      await requestGQL(CREATE_PROPERTY_MUTATION, { input });
      toast.success("Property listed successfully on FieConnect!");
      router.push("/app/properties");
    } catch (err: any) {
      console.error(err);
      toast.error(`Failed to list property: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    toast.success("Property details saved as draft!");
    router.push("/app/properties");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500 text-left">
      {/* 1. Header Navigation & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
        <div className="flex items-center gap-3">
          <Link
            href="/app/properties"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              Add New Property
            </h2>
            <p className="text-xs text-muted-foreground font-semibold mt-0.5">
              List your property on Ghana's most trusted real estate network.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <Button
            onClick={handleSaveDraft}
            variant="outline"
            className="h-10 px-4 rounded-xl text-xs font-black border-border hover:bg-background cursor-pointer"
          >
            Save as Draft
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="h-10 px-5 rounded-xl text-xs font-black bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-1.5 shadow-sm transition-all border border-primary/20 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Publishing...
              </>
            ) : (
              "List Property"
            )}
          </Button>
        </div>
      </div>

      {/* 2. Content 2-Column Grid */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
        >
          {/* Left Column: Input Form Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section 1: Property Identity */}
            <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5 text-left">
              <h3 className="text-[10px] font-extrabold uppercase text-primary tracking-widest border-b border-border/60 pb-2.5">
                Property Identity
              </h3>

              <div className="space-y-4">
                {/* Property Title */}
                <InputWrapper
                  control={form.control as any}
                  name="title"
                  label="Property Title"
                  type="text"
                  required
                  placeholder="e.g. Modern 3-Bedroom Apartment in Cantonments"
                  className="w-full h-11 px-4 rounded-xl border border-border text-xs font-semibold text-foreground placeholder-muted-foreground focus:outline-hidden focus:border-emerald-600 transition-colors bg-card"
                />

                {/* Region & District */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SelectWrapper
                    control={form.control as any}
                    name="region"
                    label="Region"
                    required
                    options={regionOptions}
                    className="w-full h-11 px-4 rounded-xl border border-border text-xs font-semibold text-foreground focus:outline-hidden focus:border-emerald-600 bg-card"
                  />

                  <InputWrapper
                    control={form.control as any}
                    name="district"
                    label="District / Neighborhood"
                    type="text"
                    required
                    placeholder="e.g. Accra Metropolitan"
                    className="w-full h-11 px-4 rounded-xl border border-border text-xs font-semibold text-foreground placeholder-muted-foreground focus:outline-hidden focus:border-emerald-600 transition-colors bg-card"
                  />
                </div>

                {/* Property Type & Rent Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SelectWrapper
                    control={form.control as any}
                    name="propertyType"
                    label="Property Type"
                    required
                    options={typeOptions}
                    className="w-full h-11 px-4 rounded-xl border border-border text-xs font-semibold text-foreground focus:outline-hidden focus:border-emerald-600 bg-card"
                  />

                  <InputWrapper
                    control={form.control as any}
                    name="price"
                    label="Monthly Rent (GHS)"
                    type="number"
                    required
                    placeholder="0.00"
                    className="w-full h-11 px-4 rounded-xl border border-border text-xs font-semibold text-foreground placeholder-muted-foreground focus:outline-hidden focus:border-emerald-600 transition-colors bg-card"
                  />
                </div>

                {/* Detailed specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <InputWrapper
                    control={form.control as any}
                    name="bedrooms"
                    label="Bedrooms"
                    type="number"
                    className="w-full h-11 px-4 rounded-xl border border-border text-xs font-semibold text-foreground focus:outline-hidden focus:border-emerald-600 bg-card"
                  />

                  <InputWrapper
                    control={form.control as any}
                    name="bathrooms"
                    label="Bathrooms"
                    type="number"
                    className="w-full h-11 px-4 rounded-xl border border-border text-xs font-semibold text-foreground focus:outline-hidden focus:border-emerald-600 bg-card"
                  />

                  <InputWrapper
                    control={form.control as any}
                    name="size"
                    label="Size (m²)"
                    type="number"
                    className="w-full h-11 px-4 rounded-xl border border-border text-xs font-semibold text-foreground focus:outline-hidden focus:border-emerald-600 bg-card"
                  />

                  <SelectWrapper
                    control={form.control as any}
                    name="parking"
                    label="Parking"
                    options={parkingOptions}
                    className="w-full h-11 px-4 rounded-xl border border-border text-xs font-semibold text-foreground focus:outline-hidden focus:border-emerald-600 bg-card"
                  />
                </div>

                {/* Description */}
                <TextareaWrapper
                  control={form.control as any}
                  name="description"
                  label="Description"
                  required
                  rows={4}
                  placeholder="Describe the amenities, nearby landmarks, and specific details..."
                  className="w-full p-4 rounded-xl border border-border text-xs font-semibold text-foreground placeholder-muted-foreground focus:outline-hidden focus:border-primary transition-colors resize-none bg-card"
                />
              </div>
            </div>

            {/* Section 2: Media & Legal */}
            <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5 text-left">
              <h3 className="text-[10px] font-extrabold uppercase text-primary tracking-widest border-b border-border/60 pb-2.5">
                Media & Legal
              </h3>

              {/* Upload Buttons Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Cover Image Upload */}
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block text-center mb-1">
                    Cover Image <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    ref={coverInputRef}
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "cover")}
                  />
                  <button
                    type="button"
                    onClick={() => coverInputRef.current?.click()}
                    disabled={uploadingCover}
                    className="relative w-full aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary bg-background/50 flex flex-col items-center justify-center p-3 text-center gap-1.5 transition-colors cursor-pointer overflow-hidden"
                  >
                    {coverUrl ? (
                      <Image
                        src={coverUrl}
                        alt="Cover Preview"
                        fill
                        className="object-cover"
                      />
                    ) : uploadingCover ? (
                      <Loader2
                        size={16}
                        className="animate-spin text-primary"
                      />
                    ) : (
                      <>
                        <ImageIcon
                          size={18}
                          className="text-muted-foreground"
                        />
                        <span className="text-[9px] font-bold text-muted-foreground leading-tight">
                          Upload Image
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {/* Room Upload */}
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block text-center mb-1">
                    Room 1
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    ref={roomInputRef}
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "room")}
                  />
                  <button
                    type="button"
                    onClick={() => roomInputRef.current?.click()}
                    disabled={uploadingRoom}
                    className="relative w-full aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary bg-background/50 flex flex-col items-center justify-center p-3 text-center gap-1.5 transition-colors cursor-pointer overflow-hidden"
                  >
                    {roomUrl ? (
                      <Image
                        src={roomUrl}
                        alt="Room Preview"
                        fill
                        className="object-cover"
                      />
                    ) : uploadingRoom ? (
                      <Loader2
                        size={16}
                        className="animate-spin text-primary"
                      />
                    ) : (
                      <>
                        <ImageIcon
                          size={18}
                          className="text-muted-foreground"
                        />
                        <span className="text-[9px] font-bold text-muted-foreground leading-tight">
                          Upload Image
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {/* Kitchen Upload */}
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block text-center mb-1">
                    Kitchen
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    ref={kitchenInputRef}
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "kitchen")}
                  />
                  <button
                    type="button"
                    onClick={() => kitchenInputRef.current?.click()}
                    disabled={uploadingKitchen}
                    className="relative w-full aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary bg-background/50 flex flex-col items-center justify-center p-3 text-center gap-1.5 transition-colors cursor-pointer overflow-hidden"
                  >
                    {kitchenUrl ? (
                      <Image
                        src={kitchenUrl}
                        alt="Kitchen Preview"
                        fill
                        className="object-cover"
                      />
                    ) : uploadingKitchen ? (
                      <Loader2
                        size={16}
                        className="animate-spin text-primary"
                      />
                    ) : (
                      <>
                        <ImageIcon
                          size={18}
                          className="text-muted-foreground"
                        />
                        <span className="text-[9px] font-bold text-muted-foreground leading-tight">
                          Upload Image
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {/* Bathroom Upload */}
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block text-center mb-1">
                    Bathroom
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    ref={bathroomInputRef}
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "bathroom")}
                  />
                  <button
                    type="button"
                    onClick={() => bathroomInputRef.current?.click()}
                    disabled={uploadingBathroom}
                    className="relative w-full aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary bg-background/50 flex flex-col items-center justify-center p-3 text-center gap-1.5 transition-colors cursor-pointer overflow-hidden"
                  >
                    {bathroomUrl ? (
                      <Image
                        src={bathroomUrl}
                        alt="Bathroom Preview"
                        fill
                        className="object-cover"
                      />
                    ) : uploadingBathroom ? (
                      <Loader2
                        size={16}
                        className="animate-spin text-primary"
                      />
                    ) : (
                      <>
                        <ImageIcon
                          size={18}
                          className="text-muted-foreground"
                        />
                        <span className="text-[9px] font-bold text-muted-foreground leading-tight">
                          Upload Image
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Tenancy Agreement Upload */}
              <div className="border border-border rounded-2xl p-4 bg-background/30 flex items-center justify-between gap-4 mt-2">
                <div className="flex items-center gap-3 text-left">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">
                      Tenancy Agreement Template
                    </h4>
                    <p className="text-[10px] text-muted-foreground font-semibold leading-relaxed mt-0.5">
                      {pdfName || "Upload your signed standard agreement (PDF)"}
                    </p>
                  </div>
                </div>

                <input
                  type="file"
                  accept=".pdf"
                  ref={pdfInputRef}
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, "pdf")}
                />
                <Button
                  type="button"
                  onClick={() => pdfInputRef.current?.click()}
                  disabled={uploadingPdf}
                  variant="outline"
                  className="h-9 px-3 rounded-lg text-[10px] font-extrabold border-border hover:bg-background cursor-pointer shrink-0"
                >
                  {uploadingPdf ? (
                    <Loader2 size={12} className="animate-spin text-primary" />
                  ) : pdfUrl ? (
                    "Change PDF"
                  ) : (
                    "Upload PDF"
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Preview & Pro Tip cards */}
          <div className="space-y-6">
            {/* Card 1: Live Preview */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs text-left relative">
              <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs z-10">
                Live Preview
              </span>

              {/* Image display */}
              <div className="relative h-44 w-full bg-input/40 flex items-center justify-center">
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt="Cover Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Property Cover Image
                  </div>
                )}

                {/* Price Tag overlay */}
                <div className="absolute bottom-3 right-3 bg-card/95 backdrop-blur-xs px-3 py-1 rounded-lg text-foreground font-black text-xs shadow-xs border border-border/40">
                  GH₵ {(watchedValues.price || 0).toLocaleString()}{" "}
                  <span className="text-[9px] font-bold text-muted-foreground">
                    /mo
                  </span>
                </div>
              </div>

              {/* Info details */}
              <div className="p-5 space-y-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-foreground line-clamp-1">
                    {watchedValues.title || "Modern 3-Bedroom Apartment"}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold">
                    <MapPin size={10} />
                    {watchedValues.district
                      ? watchedValues.district + ", "
                      : ""}
                    {watchedValues.region}
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 border-t border-b border-border py-3 text-[10px] font-bold text-muted-foreground">
                  <div>
                    <span className="text-[8px] text-muted-foreground uppercase block tracking-wider">
                      Specs
                    </span>
                    <span className="text-foreground block mt-0.5">
                      {watchedValues.bedrooms} Beds
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] text-muted-foreground uppercase block tracking-wider">
                      Baths
                    </span>
                    <span className="text-foreground block mt-0.5">
                      {watchedValues.bathrooms} Baths
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] text-muted-foreground uppercase block tracking-wider">
                      Area
                    </span>
                    <span className="text-foreground block mt-0.5">
                      {watchedValues.size} m²
                    </span>
                  </div>
                </div>

                {/* Description snippet */}
                <p className="text-[10px] text-muted-foreground font-semibold leading-relaxed line-clamp-2">
                  {watchedValues.description ||
                    "Your property description will appear here as you type. Start filling in the form to see how it looks to potential tenants."}
                </p>

                {/* Owner info card */}
                <div className="flex items-center gap-3 pt-2 border-t border-border/40">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20">
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </div>
                  <div>
                    <h5 className="text-[10px] font-extrabold text-foreground">
                      {user?.firstName} {user?.lastName}
                    </h5>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-primary block mt-0.5">
                      Verified Owner
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Pro Tip */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 text-left space-y-2">
              <div className="flex items-center gap-2 text-primary font-extrabold text-xs">
                <Sparkles size={16} className="text-primary" />
                Pro Tip
              </div>
              <p className="text-[10px] text-foreground/80 font-bold leading-relaxed">
                Properties with 4+ high-quality images and a detailed
                description get 3x more views in {watchedValues.region}. Make
                sure to capture key areas like rooms, the kitchen, and
                bathrooms.
              </p>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
