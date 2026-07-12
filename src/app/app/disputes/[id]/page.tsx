'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '../../layout';
import { requestGQL } from '../../../../lib/graphql-client';
import {
  DISPUTE_QUERY,
  ADD_DISPUTE_COMMENT_MUTATION,
  RESOLVE_DISPUTE_MUTATION,
} from '../../../../graphql/operations';
import { Button } from '../../../../components/ui/button';
import { toast } from 'sonner';
import { isLandlord } from '../../../../lib/utils';
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  MessageSquare,
  FileText,
  User as UserIcon,
  ChevronLeft,
  Send,
  Eye,
  Loader2,
} from 'lucide-react';
import { Skeleton } from '../../../../components/ui/skeleton';

interface UserType {
  id: string;
  firstName: string;
  lastName: string;
}

interface Property {
  id: string;
  title: string;
  image: string;
  location: string;
  price: number;
}

interface Comment {
  id: string;
  sender: UserType;
  text: string;
  createdAt: string;
}

interface Dispute {
  id: string;
  tenancy: {
    id: string;
    property: Property;
  };
  creator: UserType;
  title: string;
  description: string;
  evidenceUrl?: string;
  status: string;
  comments: Comment[];
  viewedByLandlordAt?: string;
  viewedByTenantAt?: string;
  createdAt: string;
}

export default function DisputeDetailsPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { user } = useUser();
  const landlordMode = isLandlord(user);

  const [dispute, setDispute] = useState<Dispute | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [closingDispute, setClosingDispute] = useState(false);

  const loadDispute = async () => {
    try {
      const data = await requestGQL(DISPUTE_QUERY, { id });
      if (data.dispute) {
        setDispute(data.dispute as Dispute);
      }
    } catch (err: any) {
      console.error('Failed to load dispute workspace:', err);
      toast.error(err.message || 'Failed to load dispute.');
      router.push('/app/disputes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && id) {
      loadDispute();
      // Poll dispute updates every 8 seconds
      const interval = setInterval(loadDispute, 8000);
      return () => clearInterval(interval);
    }
  }, [user, id]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSubmittingComment(true);
    try {
      const data = await requestGQL(ADD_DISPUTE_COMMENT_MUTATION, {
        id,
        text: commentText,
      });
      if (data.addDisputeComment?.comments) {
        setDispute((prev) =>
          prev
            ? { ...prev, comments: data.addDisputeComment.comments as Comment[] }
            : null
        );
      }
      setCommentText('');
      toast.success('Comment added successfully.');
      loadDispute();
    } catch (err: any) {
      toast.error(err.message || 'Failed to post comment.');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleResolveDispute = async () => {
    if (!window.confirm('Are you sure you want to mark this dispute as resolved and close it?')) {
      return;
    }
    setClosingDispute(true);
    try {
      await requestGQL(RESOLVE_DISPUTE_MUTATION, { id });
      toast.success('Dispute resolved and closed successfully!');
      loadDispute();
    } catch (err: any) {
      toast.error(err.message || 'Failed to resolve dispute.');
    } finally {
      setClosingDispute(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 text-left animate-pulse">
        <Skeleton className="h-6 w-24 bg-zinc-200" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-64 bg-zinc-200" />
          <Skeleton className="h-10 w-32 bg-zinc-200" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-96 bg-zinc-200 rounded-2xl" />
          <Skeleton className="h-96 bg-zinc-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!dispute) return null;

  const isCreatorOfDispute = dispute.creator.id === user?.id;

  // Determine read state metadata
  const oppositeReadTime = landlordMode ? dispute.viewedByTenantAt : dispute.viewedByLandlordAt;
  const oppositeRoleName = landlordMode ? 'Tenant' : 'Landlord';

  // Determine Timeline stages
  const firstOpposingComment = dispute.comments.find(
    (c) => c.sender.id !== dispute.creator.id
  );

  return (
    <div className="space-y-6 text-left">
      <div>
        <Link
          href="/app/disputes"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-zinc-700 transition-colors"
        >
          <ChevronLeft size={14} /> Back to Disputes
        </Link>
      </div>

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">Dispute Resolution</h1>
          <p className="text-xs font-semibold text-zinc-400 mt-1">
            Track progress and message details regarding the dispute workspace.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {dispute.status === 'OPEN' ? (
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-100/50 shadow-2xs">
              <Clock size={11} className="animate-pulse" /> Status: Open
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 bg-zinc-100 text-zinc-500 font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
              <CheckCircle size={11} /> Status: Closed
            </span>
          )}

          {oppositeReadTime ? (
            <span className="inline-flex items-center gap-1 text-[10px] text-zinc-400 font-semibold bg-zinc-50 px-2.5 py-1 rounded-lg border border-zinc-100">
              <Eye size={12} /> Viewed by {oppositeRoleName} on{' '}
              {new Date(oppositeReadTime).toLocaleDateString()}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] text-zinc-400 font-semibold bg-zinc-50 px-2.5 py-1 rounded-lg border border-zinc-100">
              <Clock size={12} /> Awaiting {oppositeRoleName} view
            </span>
          )}
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Pane (Dispute Details & Message Thread) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dispute info card */}
          <div className="bg-white border border-zinc-200/85 p-5 rounded-2xl shadow-2xs text-left space-y-4">
            <div>
              <span className="text-[10px] font-black text-primary uppercase tracking-wider">
                Original Complaint
              </span>
              <h2 className="text-base font-black text-slate-800 tracking-tight mt-1">
                {dispute.title}
              </h2>
              <p className="text-[10px] text-zinc-450 font-bold mt-1.5">
                Filed by {dispute.creator.firstName} {dispute.creator.lastName} on{' '}
                {new Date(parseInt(dispute.createdAt) || dispute.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="p-4 bg-zinc-50/50 border border-zinc-150 rounded-xl">
              <p className="text-xs text-zinc-700 leading-relaxed font-semibold">
                {dispute.description}
              </p>
            </div>

            {dispute.evidenceUrl && (
              <a
                href={dispute.evidenceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 p-2 px-4 bg-primary/10 hover:bg-primary/15 text-primary text-xs font-bold rounded-xl transition-colors cursor-pointer border border-primary/10"
              >
                <FileText size={14} /> Download Evidence File
              </a>
            )}

            {/* Resolve button for Dispute creator */}
            {dispute.status === 'OPEN' && isCreatorOfDispute && (
              <div className="pt-2 border-t border-zinc-100 flex justify-end">
                <Button
                  onClick={handleResolveDispute}
                  disabled={closingDispute}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs px-6 py-2.5 flex items-center gap-1.5 cursor-pointer shadow-xs border border-emerald-500/20"
                >
                  {closingDispute ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <CheckCircle size={14} />
                  )}
                  Mark as Resolved & Close Dispute
                </Button>
              </div>
            )}
          </div>

          {/* Comment timeline chat thread */}
          <div className="bg-white border border-zinc-200/85 p-5 rounded-2xl shadow-2xs space-y-4">
            <h3 className="text-xs font-black text-slate-850 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare size={15} /> Discussion Board
            </h3>

            {/* Messages box */}
            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              {dispute.comments.length === 0 ? (
                <div className="p-10 text-center text-zinc-400 text-xs font-semibold bg-zinc-50/40 rounded-xl border border-dashed border-zinc-200/60">
                  No discussion messages yet. Write a message below to start mediation.
                </div>
              ) : (
                dispute.comments.map((comment) => {
                  const isSenderSelf = comment.sender.id === user?.id;
                  return (
                    <div
                      key={comment.id}
                      className={`flex flex-col max-w-[85%] rounded-2xl p-4.5 space-y-1 font-semibold text-xs text-left ${
                        isSenderSelf
                          ? 'bg-primary/5 border border-primary/15 ml-auto rounded-tr-none'
                          : 'bg-zinc-50 border border-zinc-150 mr-auto rounded-tl-none'
                      }`}
                    >
                      <p className="text-[10px] text-zinc-400 font-extrabold uppercase">
                        {isSenderSelf
                          ? 'You'
                          : `${comment.sender.firstName} ${comment.sender.lastName}`}
                      </p>
                      <p className="text-slate-800 leading-relaxed font-medium">
                        {comment.text}
                      </p>
                      <p className="text-[9px] text-zinc-400 font-semibold self-end mt-1">
                        {new Date(parseInt(comment.createdAt) || comment.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

            {/* Comment submission form */}
            {dispute.status === 'OPEN' ? (
              <form onSubmit={handleAddComment} className="pt-4 border-t border-zinc-100 space-y-3">
                <textarea
                  rows={3}
                  placeholder="Type your mediation response or update details here..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full p-3 rounded-xl border border-zinc-200 text-xs focus:outline-hidden focus:border-primary transition-colors bg-white resize-none font-medium leading-relaxed"
                  required
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={submittingComment || !commentText.trim()}
                    className="h-10 px-5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    {submittingComment ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Send size={12} />
                    )}
                    Send Response
                  </Button>
                </div>
              </form>
            ) : (
              <div className="p-4 bg-zinc-50 text-center rounded-xl text-xs font-semibold text-zinc-500 border border-zinc-200">
                This dispute has been marked as resolved and closed. No further comments can be posted.
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Timeline & Property metadata */}
        <div className="space-y-6">
          {/* Timeline tracker */}
          <div className="bg-white border border-zinc-200/85 p-5 rounded-2xl shadow-2xs text-left space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-50 pb-2">
              <h3 className="text-xs font-black text-slate-850 uppercase tracking-wider">
                Timeline
              </h3>
              <span className="text-[9px] text-zinc-400 font-extrabold tracking-wider">
                Dispute ID: #DSP-{dispute.id.substring(18, 22).toUpperCase()}
              </span>
            </div>

            <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-zinc-150">
              {/* Step 1: Complaint Filed */}
              <div className="flex gap-3 items-start relative z-10 text-xs">
                <div className="h-8 w-8 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <AlertTriangle size={14} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-extrabold text-slate-800">Complaint Filed</h4>
                    <span className="text-[9px] text-zinc-400">
                      {new Date(parseInt(dispute.createdAt) || dispute.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 font-semibold leading-relaxed mt-0.5">
                    Dispute officially submitted. Other party notified.
                  </p>
                </div>
              </div>

              {/* Step 2: Response */}
              <div className="flex gap-3 items-start relative z-10 text-xs">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 border ${
                  firstOpposingComment
                    ? 'bg-amber-500 border-amber-500/20 text-white'
                    : 'bg-zinc-100 border-zinc-200 text-zinc-400'
                }`}>
                  <MessageSquare size={14} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className={`font-extrabold ${firstOpposingComment ? 'text-slate-800' : 'text-zinc-450'}`}>
                      Response Filed
                    </h4>
                    {firstOpposingComment && (
                      <span className="text-[9px] text-zinc-400">
                        {new Date(parseInt(firstOpposingComment.createdAt) || firstOpposingComment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-zinc-500 font-semibold leading-relaxed mt-0.5">
                    {firstOpposingComment
                      ? 'Acknowledgement response posted by the other party.'
                      : 'Awaiting formal response or comment from the other party.'}
                  </p>
                </div>
              </div>

              {/* Step 3: Resolution */}
              <div className="flex gap-3 items-start relative z-10 text-xs">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 border ${
                  dispute.status === 'RESOLVED'
                    ? 'bg-emerald-500 border-emerald-500/20 text-white'
                    : 'bg-zinc-100 border-zinc-200 text-zinc-400'
                }`}>
                  <CheckCircle size={14} />
                </div>
                <div>
                  <h4 className={`font-extrabold ${dispute.status === 'RESOLVED' ? 'text-slate-800' : 'text-zinc-450'}`}>
                    Resolution / Closing
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-semibold leading-relaxed mt-0.5">
                    {dispute.status === 'RESOLVED'
                      ? 'Mediation completed and case closed.'
                      : 'Step to follow response mediation.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Property tenancy metadata info */}
          <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-2xs overflow-hidden p-4 space-y-4 text-xs font-semibold">
            <h3 className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">
              Property Information
            </h3>
            <div className="relative h-32 w-full rounded-xl overflow-hidden border border-zinc-150">
              <Image
                src={dispute.tenancy.property.image}
                alt={dispute.tenancy.property.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-black text-slate-800">{dispute.tenancy.property.title}</p>
              <p className="text-[10px] text-zinc-450 mt-0.5">{dispute.tenancy.property.location}</p>
            </div>
            <div className="pt-2 border-t border-zinc-50">
              <Link href={`/app/tenancies/${dispute.tenancy.id}`}>
                <Button
                  variant="outline"
                  className="w-full h-9 border-zinc-200 text-zinc-700 font-bold rounded-xl text-[11px] cursor-pointer"
                >
                  View Tenancy Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
