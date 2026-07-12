'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '../layout';
import { requestGQL } from '../../../lib/graphql-client';
import {
  MY_APPLICATIONS_QUERY,
  RECEIVED_APPLICATIONS_QUERY,
  UPDATE_APPLICATION_STATUS_MUTATION,
  REQUEST_FURTHER_DETAILS_MUTATION,
  SUBMIT_FURTHER_DETAILS_MUTATION,
} from '../../../graphql/operations';
import { Button } from '../../../components/ui/button';
import { toast } from 'sonner';
import { isLandlord } from '../../../lib/utils';
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  HelpCircle,
  Send,
  MessageSquare,
  Building,
  User as UserIcon,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Skeleton } from '../../../components/ui/skeleton';

interface Property {
  id: string;
  title: string;
  image: string;
  location: string;
  price: number;
  bedrooms?: string;
  bathrooms?: string;
}

interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Application {
  id: string;
  property: Property;
  tenant?: Tenant;
  nationalIdUrl?: string;
  supportingDocsUrl?: string;
  employerName?: string;
  jobTitle?: string;
  monthlyIncome?: string;
  lengthOfEmployment?: string;
  personalStatement?: string;
  status: string;
  furtherDetailsRequest?: string;
  furtherDetailsResponse?: string;
  createdAt: string;
}

export default function ApplicationsPage() {
  const { user } = useUser();
  const landlordMode = isLandlord(user);

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // Landlord interaction states
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [activeRequestAppId, setActiveRequestAppId] = useState<string | null>(null);

  // Tenant interaction states
  const [tenantResponse, setTenantResponse] = useState('');
  const [activeReplyAppId, setActiveReplyAppId] = useState<string | null>(null);

  // Load applications
  const loadApplications = async () => {
    try {
      if (landlordMode) {
        const data = await requestGQL(RECEIVED_APPLICATIONS_QUERY);
        setApplications(data.receivedApplications as Application[]);
      } else {
        const data = await requestGQL(MY_APPLICATIONS_QUERY);
        setApplications(data.myApplications as Application[]);
      }
    } catch (err) {
      console.error('Failed to load applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadApplications();
    }
  }, [user, landlordMode]);

  // Landlord Actions
  const handleStatusUpdate = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      await requestGQL(UPDATE_APPLICATION_STATUS_MUTATION, { id, status });
      toast.success(`Application has been ${status.toLowerCase()} successfully!`);
      loadApplications();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update application status.');
    }
  };

  const handleRequestFurtherDetails = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    if (!requestMessage.trim()) {
      toast.error('Please enter a message or question.');
      return;
    }
    try {
      await requestGQL(REQUEST_FURTHER_DETAILS_MUTATION, { id, message: requestMessage });
      toast.success('Request sent to tenant successfully.');
      setRequestMessage('');
      setActiveRequestAppId(null);
      loadApplications();
    } catch (err: any) {
      toast.error(err.message || 'Failed to request further details.');
    }
  };

  // Tenant Actions
  const handleTenantReplySubmit = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    if (!tenantResponse.trim()) {
      toast.error('Please type a response.');
      return;
    }
    try {
      await requestGQL(SUBMIT_FURTHER_DETAILS_MUTATION, { id, response: tenantResponse });
      toast.success('Your response was submitted to the landlord successfully!');
      setTenantResponse('');
      setActiveReplyAppId(null);
      loadApplications();
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit response.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return (
          <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            <CheckCircle size={10} /> Approved
          </span>
        );
      case 'REJECTED':
        return (
          <span className="flex items-center gap-1 bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            <XCircle size={10} /> Rejected
          </span>
        );
      case 'INFORMATION_REQUESTED':
        return (
          <span className="flex items-center gap-1 bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider animate-pulse">
            <HelpCircle size={10} /> Action Required
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            <Clock size={10} /> Under Review
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 text-left animate-pulse">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 bg-zinc-200" />
          <Skeleton className="h-4 w-72 bg-zinc-200/85" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full bg-zinc-200 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      <div>
        <h1 className="text-xl font-black text-slate-800 tracking-tight">
          {landlordMode ? 'Received Applications' : 'My Applications'}
        </h1>
        <p className="text-xs font-semibold text-zinc-400 mt-1">
          {landlordMode
            ? 'Review and manage rental requests for your listings.'
            : 'Track the status of your tenancy applications and respond to updates.'}
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
          <div className="h-14 w-14 bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 rounded-full mx-auto">
            <FileText size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-foreground">No applications found</h3>
            <p className="text-xs text-muted-foreground font-semibold">
              {landlordMode
                ? 'When tenants apply for your properties, they will appear here.'
                : "You haven't submitted any tenancy applications yet."}
            </p>
          </div>
          {!landlordMode && (
            <Link href="/app/properties">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-xs px-5 py-2 cursor-pointer mt-2">
                Browse Properties
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-xs hover:border-zinc-300 transition-all"
            >
              {/* Main Card Header Bar */}
              <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 bg-zinc-50/20">
                <div className="flex gap-4">
                  {/* Property mini thumbnail */}
                  <div className="relative h-14 w-20 rounded-lg overflow-hidden border border-zinc-200/60 shrink-0">
                    <Image
                      src={app.property.image}
                      alt={app.property.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-800 line-clamp-1">
                      {app.property.title}
                    </h3>
                    <p className="text-[10px] text-zinc-400 font-bold mt-0.5">
                      {app.property.location}
                    </p>
                    <p className="text-[10px] font-extrabold text-primary mt-1">
                      GH₵ {app.property.price.toLocaleString()} / mo
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3">
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[9px] text-zinc-400 font-semibold">
                      Applied {new Date(parseInt(app.createdAt) || app.createdAt).toLocaleDateString()}
                    </span>
                    {getStatusBadge(app.status)}
                  </div>
                  <button
                    onClick={() => setSelectedAppId(selectedAppId === app.id ? null : app.id)}
                    className="p-1 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                  >
                    {selectedAppId === app.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Collapsible Details Body */}
              {selectedAppId === app.id && (
                <div className="p-5 space-y-6 border-t border-zinc-100/50 animate-in slide-in-from-top-1 duration-200">
                  {/* LANDLORD MODE SPECIFIC VIEWS */}
                  {landlordMode && app.tenant && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start text-xs font-semibold">
                      {/* Left: Applicant Bio & Employment */}
                      <div className="lg:col-span-2 space-y-4 text-left">
                        <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">
                          Applicant Profile
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-start gap-3 p-3 bg-zinc-50 rounded-xl">
                            <UserIcon size={16} className="text-zinc-400 mt-0.5" />
                            <div>
                              <p className="font-bold text-zinc-800">
                                {app.tenant.firstName} {app.tenant.lastName}
                              </p>
                              <p className="text-[10px] text-zinc-400">Applicant Name</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-zinc-50 rounded-xl">
                            <Building size={16} className="text-zinc-400 mt-0.5" />
                            <div>
                              <p className="font-bold text-zinc-800">{app.employerName}</p>
                              <p className="text-[10px] text-zinc-400">Employer Name</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-zinc-50 rounded-xl">
                            <FileText size={16} className="text-zinc-400 mt-0.5" />
                            <div>
                              <p className="font-bold text-zinc-800">{app.jobTitle}</p>
                              <p className="text-[10px] text-zinc-400">Job Title</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-zinc-50 rounded-xl">
                            <Clock size={16} className="text-zinc-400 mt-0.5" />
                            <div>
                              <p className="font-bold text-zinc-800">
                                {app.lengthOfEmployment} ({app.monthlyIncome} GH₵/mo)
                              </p>
                              <p className="text-[10px] text-zinc-400">Tenure & Income Range</p>
                            </div>
                          </div>
                        </div>

                        {/* Personal Statement */}
                        <div className="space-y-1 bg-zinc-50 p-4 rounded-xl">
                          <p className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">
                            Personal Statement
                          </p>
                          <p className="text-zinc-700 leading-relaxed font-medium">
                            "{app.personalStatement}"
                          </p>
                        </div>
                      </div>

                      {/* Right: Contact & Documents */}
                      <div className="space-y-4 text-left">
                        <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">
                          Contact & Documents
                        </h4>
                        <div className="space-y-2">
                          <a
                            href={`tel:${app.tenant.phone}`}
                            className="flex items-center gap-2 p-2.5 bg-zinc-50 hover:bg-zinc-100 rounded-xl transition-all"
                          >
                            <Phone size={14} className="text-zinc-400" />
                            <span>{app.tenant.phone}</span>
                          </a>
                          <a
                            href={`mailto:${app.tenant.email}`}
                            className="flex items-center gap-2 p-2.5 bg-zinc-50 hover:bg-zinc-100 rounded-xl transition-all"
                          >
                            <Mail size={14} className="text-zinc-400" />
                            <span>{app.tenant.email}</span>
                          </a>
                        </div>

                        <div className="space-y-2 pt-2">
                          <a
                            href={app.nationalIdUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between p-3 border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <FileText size={16} className="text-primary" />
                              <span className="font-bold">National ID (Ghanacard)</span>
                            </div>
                            <span className="text-[10px] text-primary font-bold uppercase">View</span>
                          </a>
                          {app.supportingDocsUrl && (
                            <a
                              href={app.supportingDocsUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-between p-3 border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <FileText size={16} className="text-primary" />
                                <span className="font-bold">Supporting Documents</span>
                              </div>
                              <span className="text-[10px] text-primary font-bold uppercase">View</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TENANT MODE SPECIFIC VIEWS */}
                  {!landlordMode && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold text-left">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">
                          My Application Data
                        </h4>
                        <div className="space-y-2 bg-zinc-50 p-4 rounded-xl">
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Employer Name:</span>
                            <span className="font-bold text-zinc-800">{app.employerName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Job Title:</span>
                            <span className="font-bold text-zinc-800">{app.jobTitle}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Employment Length:</span>
                            <span className="font-bold text-zinc-800">{app.lengthOfEmployment}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Income Range:</span>
                            <span className="font-bold text-zinc-800">{app.monthlyIncome} GH₵</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">
                          Uploaded Documents
                        </h4>
                        <a
                          href={app.nationalIdUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between p-3 bg-zinc-50 hover:bg-zinc-100 rounded-xl transition-all"
                        >
                          <span className="font-bold">National ID (Ghanacard)</span>
                          <span className="text-primary uppercase text-[10px] font-bold">View</span>
                        </a>
                        {app.supportingDocsUrl && (
                          <a
                            href={app.supportingDocsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between p-3 bg-zinc-50 hover:bg-zinc-100 rounded-xl transition-all"
                          >
                            <span className="font-bold">Supporting Documents</span>
                            <span className="text-primary uppercase text-[10px] font-bold">View</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* INTERACTIVE THREAD (Landlord / Tenant details request panel) */}
                  {(app.status === 'INFORMATION_REQUESTED' || app.furtherDetailsResponse) && (
                    <div className="bg-amber-50/40 dark:bg-amber-950/5 border border-amber-250/20 p-4 rounded-xl space-y-3 text-left">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                        <MessageSquare size={14} /> Information Request History
                      </div>
                      
                      {app.furtherDetailsRequest && (
                        <div className="space-y-1 pl-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-amber-200">
                          <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">
                            Landlord Question:
                          </p>
                          <p className="text-xs text-zinc-700 dark:text-zinc-350 font-medium">
                            "{app.furtherDetailsRequest}"
                          </p>
                        </div>
                      )}

                      {app.furtherDetailsResponse && (
                        <div className="space-y-1 pl-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-primary/40 pt-2 border-t border-zinc-100">
                          <p className="text-[10px] font-bold text-primary uppercase">
                            Tenant Response:
                          </p>
                          <p className="text-xs text-zinc-700 dark:text-zinc-350 font-medium">
                            "{app.furtherDetailsResponse}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ACTION SECTION PANEL */}
                  {/* Landlord Action controls */}
                  {landlordMode && app.status === 'PENDING' && (
                    <div className="pt-4 border-t border-zinc-100 flex flex-wrap gap-3 justify-end">
                      {activeRequestAppId !== app.id ? (
                        <>
                          <Button
                            onClick={() => setActiveRequestAppId(app.id)}
                            variant="outline"
                            className="h-10 px-5 border-zinc-200 text-zinc-700 hover:bg-zinc-50 text-xs font-bold rounded-xl cursor-pointer"
                          >
                            Request Info
                          </Button>
                          <Button
                            onClick={() => handleStatusUpdate(app.id, 'REJECTED')}
                            className="h-10 px-5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl cursor-pointer"
                          >
                            Reject Application
                          </Button>
                          <Button
                            onClick={() => handleStatusUpdate(app.id, 'APPROVED')}
                            className="h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold rounded-xl cursor-pointer shadow-xs border border-primary/20"
                          >
                            Approve Tenancy
                          </Button>
                        </>
                      ) : (
                        <form
                          onSubmit={(e) => handleRequestFurtherDetails(e, app.id)}
                          className="w-full space-y-3"
                        >
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-zinc-700">
                              Type request message to tenant:
                            </label>
                            <textarea
                              rows={3}
                              placeholder="e.g. Please provide your bank statements for the past 6 months to confirm steady income."
                              value={requestMessage}
                              onChange={(e) => setRequestMessage(e.target.value)}
                              className="w-full p-3 rounded-xl border border-zinc-200 text-xs focus:outline-hidden focus:border-primary transition-colors bg-white resize-none font-medium leading-relaxed"
                              required
                            />
                          </div>
                          <div className="flex gap-2 justify-end">
                            <Button
                              type="button"
                              onClick={() => {
                                setActiveRequestAppId(null);
                                setRequestMessage('');
                              }}
                              variant="outline"
                              className="h-9 px-4 border-zinc-200 text-zinc-700 text-xs font-bold rounded-xl cursor-pointer"
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              className="h-9 px-5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                            >
                              <Send size={12} /> Send Request
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}

                  {/* Tenant response form */}
                  {!landlordMode && app.status === 'INFORMATION_REQUESTED' && (
                    <div className="pt-4 border-t border-zinc-100">
                      {activeReplyAppId !== app.id ? (
                        <div className="flex justify-end">
                          <Button
                            onClick={() => setActiveReplyAppId(app.id)}
                            className="h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <MessageSquare size={13} /> Respond to Request
                          </Button>
                        </div>
                      ) : (
                        <form
                          onSubmit={(e) => handleTenantReplySubmit(e, app.id)}
                          className="space-y-3"
                        >
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-zinc-750 block">
                              Your Response:
                            </label>
                            <textarea
                              rows={4}
                              placeholder="Write your explanation or confirm additional document links here..."
                              value={tenantResponse}
                              onChange={(e) => setTenantResponse(e.target.value)}
                              className="w-full p-3 rounded-xl border border-zinc-200 text-xs focus:outline-hidden focus:border-primary transition-colors bg-white resize-none font-medium leading-relaxed"
                              required
                            />
                          </div>
                          <div className="flex gap-2 justify-end">
                            <Button
                              type="button"
                              onClick={() => {
                                setActiveReplyAppId(null);
                                setTenantResponse('');
                              }}
                              variant="outline"
                              className="h-9 px-4 border-zinc-200 text-zinc-700 text-xs font-bold rounded-xl cursor-pointer"
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              className="h-9 px-5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                            >
                              <Send size={12} /> Submit Response
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
