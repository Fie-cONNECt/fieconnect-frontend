'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useUser } from '../layout';
import { requestGQL } from '../../../lib/graphql-client';
import { UPDATE_PROFILE_MUTATION, CHANGE_PASSWORD_MUTATION } from '../../../graphql/operations';
import { uploadToSupabase } from '../../../lib/supabase';
import { Button } from '../../../components/ui/button';
import { useForm } from 'react-hook-form';
import { Form } from '../../../components/ui/form';
import { InputWrapper, TextareaWrapper } from '../../../components/ui/form-wrappers';
import { toast } from 'sonner';
import { isLandlord } from '../../../lib/utils';
import {
  Camera,
  User as UserIcon,
  Building2,
  Mail,
  Phone,
  Calendar,
  Shield,
  CheckCircle,
  Edit3,
  Loader2,
  Sparkles,
  Key,
  Home,
  FileText,
  Trash2,
  Lock,
  EyeOff,
  Eye,
} from 'lucide-react';

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  bio: string;
}

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfilePage() {
  const { user } = useUser();
  const landlordMode = isLandlord(user);

  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Password section
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormValues>({
    defaultValues: { firstName: '', lastName: '', phone: '', bio: '' },
  });

  const passwordForm = useForm<PasswordFormValues>({
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || '',
        bio: user.bio || '',
      });
      setAvatarUrl(user.avatarUrl || '');
    }
  }, [user, form]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const url = await uploadToSupabase(file, 'agreements');
      setAvatarUrl(url);
      toast.success('Photo ready — save your profile to apply it.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload photo.');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSave = async (values: ProfileFormValues) => {
    setSaving(true);
    try {
      await requestGQL(UPDATE_PROFILE_MUTATION, {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        bio: values.bio || null,
        avatarUrl: avatarUrl || null,
      });
      toast.success('Profile updated successfully!');
      setEditMode(false);
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (values: PasswordFormValues) => {
    if (values.newPassword !== values.confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }
    if (values.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters.');
      return;
    }
    setChangingPassword(true);
    try {
      await requestGQL(CHANGE_PASSWORD_MUTATION, {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      toast.success('Password changed successfully!');
      passwordForm.reset();
      setShowPasswordSection(false);
    } catch (err: any) {
      toast.error(err.message || 'Failed to change password.');
    } finally {
      setChangingPassword(false);
    }
  };

  if (!user) return null;

  const initials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase();
  const memberSince = new Date(user.createdAt).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="space-y-6 text-left">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-black text-slate-800 tracking-tight">My Profile</h1>
        <p className="text-xs font-semibold text-zinc-400 mt-1">
          Manage your personal information and account settings.
        </p>
      </div>

      {/* Hero banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/70 rounded-3xl p-8 text-white shadow-lg">
        <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/5 blur-2xl" />

        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="h-24 w-24 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg bg-white/10">
              {avatarUrl ? (
                <Image src={avatarUrl} alt="Profile photo" fill className="object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-2xl font-black text-white/90">
                  {initials}
                </div>
              )}
            </div>
            {editMode && (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 h-8 w-8 bg-white rounded-xl border border-zinc-100 shadow-md flex items-center justify-center text-primary hover:bg-zinc-50 transition-colors cursor-pointer"
                  title="Upload profile photo"
                >
                  {uploadingAvatar ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Camera className="h-3.5 w-3.5" />
                  )}
                </button>
              </>
            )}
          </div>

          {/* Name + role badge */}
          <div className="text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="text-2xl font-black tracking-tight">
                {user.firstName} {user.lastName}
              </h2>
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                  landlordMode
                    ? 'bg-amber-400/20 border-amber-300/30 text-amber-200'
                    : 'bg-emerald-400/20 border-emerald-300/30 text-emerald-200'
                }`}
              >
                {landlordMode ? <Building2 size={10} /> : <Home size={10} />}
                {landlordMode ? 'Landlord' : 'Tenant'}
              </span>
            </div>
            <p className="text-white/60 text-xs font-semibold mt-1">{user.email}</p>
            {user.bio && (
              <p className="text-white/80 text-xs font-medium mt-2 max-w-xs leading-relaxed italic">
                "{user.bio}"
              </p>
            )}
            <p className="text-white/50 text-[10px] font-bold mt-3 flex items-center gap-1 justify-center sm:justify-start">
              <Calendar size={10} /> Member since {memberSince}
            </p>
          </div>

          {!editMode && (
            <div className="sm:ml-auto">
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
              >
                <Edit3 size={13} /> Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Edit profile form ── */}
      {editMode ? (
        <div className="bg-white border border-zinc-200/85 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={14} className="text-primary" /> Edit Your Information
            </h3>
            <div className="flex items-center gap-3">
              {avatarUrl && (
                <button
                  type="button"
                  onClick={() => setAvatarUrl('')}
                  className="flex items-center gap-1 text-[10px] font-bold text-red-400 hover:text-red-600 cursor-pointer transition-colors"
                >
                  <Trash2 size={11} /> Remove photo
                </button>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingAvatar}
                className="flex items-center gap-1 text-[10px] font-bold text-primary hover:text-primary/80 cursor-pointer transition-colors disabled:opacity-50"
              >
                {uploadingAvatar ? (
                  <Loader2 size={11} className="animate-spin" />
                ) : (
                  <Camera size={11} />
                )}
                {avatarUrl ? 'Change photo' : 'Upload photo'}
              </button>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputWrapper
                  control={form.control as any}
                  type="text"
                  name="firstName"
                  label="First Name"
                  placeholder="Your first name"
                  required
                />
                <InputWrapper
                  control={form.control as any}
                  type="text"
                  name="lastName"
                  label="Last Name"
                  placeholder="Your last name"
                  required
                />
              </div>

              <InputWrapper
                control={form.control as any}
                type="tel"
                name="phone"
                label="Phone Number"
                placeholder="+233 XX XXX XXXX"
              />

              {/* Email — read-only */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 block">Email Address</label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-zinc-150 bg-zinc-50 text-xs font-semibold text-zinc-400">
                  <Mail size={13} className="text-muted-foreground shrink-0" />
                  <span>{user.email}</span>
                  <span className="ml-auto text-[9px] font-black uppercase tracking-wider text-zinc-300">
                    Cannot be changed
                  </span>
                </div>
              </div>

              <TextareaWrapper
                control={form.control as any}
                name="bio"
                label="Bio"
                placeholder="Tell others a little about yourself..."
                rows={3}
              />

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    form.reset({
                      firstName: user.firstName,
                      lastName: user.lastName,
                      phone: user.phone || '',
                      bio: user.bio || '',
                    });
                    setAvatarUrl(user.avatarUrl || '');
                  }}
                  className="text-xs font-bold text-zinc-400 hover:text-zinc-700 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="h-9 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  {saving ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <CheckCircle size={13} />
                  )}
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        /* ── Read-only info cards ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-zinc-200/85 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <UserIcon size={12} /> Personal Information
            </h3>
            <div className="space-y-3">
              <InfoRow
                icon={<Mail size={13} className="text-primary/70" />}
                label="Email"
                value={user.email}
              />
              <InfoRow
                icon={<Phone size={13} className="text-primary/70" />}
                label="Phone"
                value={user.phone || '—'}
              />
              <InfoRow
                icon={<Calendar size={13} className="text-primary/70" />}
                label="Member Since"
                value={memberSince}
              />
            </div>
          </div>

          <div className="bg-white border border-zinc-200/85 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Shield size={12} /> Account Details
            </h3>
            <div className="space-y-3">
              <InfoRow
                icon={
                  landlordMode ? (
                    <Building2 size={13} className="text-amber-500" />
                  ) : (
                    <Home size={13} className="text-emerald-500" />
                  )
                }
                label="Account Type"
                value={landlordMode ? 'Landlord' : 'Tenant'}
              />
              <InfoRow
                icon={<Key size={13} className="text-primary/70" />}
                label="Account ID"
                value={`#${user.id.substring(18, 24).toUpperCase()}`}
              />
              <div className="flex items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-extrabold text-[9px] uppercase tracking-wider px-2 py-1 rounded-full">
                  <CheckCircle size={9} /> Verified Account
                </span>
              </div>
            </div>
          </div>

          {user.bio && (
            <div className="sm:col-span-2 bg-white border border-zinc-200/85 rounded-2xl p-5 shadow-xs space-y-3">
              <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText size={12} /> Bio
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">{user.bio}</p>
            </div>
          )}
        </div>
      )}

      {/* ── Security / Change Password section ── */}
      <div className="bg-white border border-zinc-200/85 rounded-2xl shadow-xs overflow-hidden">
        <button
          onClick={() => setShowPasswordSection((v) => !v)}
          className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-zinc-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-500 shrink-0">
              <Lock size={14} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-800">Change Password</p>
              <p className="text-[10px] text-zinc-400 font-semibold mt-0.5">
                Update your account password. Must be at least 8 characters.
              </p>
            </div>
          </div>
          <span
            className={`text-[10px] font-black uppercase tracking-wider transition-colors ${showPasswordSection ? 'text-primary' : 'text-zinc-400'}`}
          >
            {showPasswordSection ? 'Cancel' : 'Update →'}
          </span>
        </button>

        {showPasswordSection && (
          <div className="px-5 pb-6 border-t border-zinc-100 pt-5">
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(handleChangePassword)}
                className="space-y-4 max-w-md"
              >
                {/* Current password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 block">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrent ? 'text' : 'password'}
                      placeholder="Enter your current password"
                      {...passwordForm.register('currentPassword', { required: true })}
                      className="w-full pr-10 p-3 rounded-xl border border-zinc-200 text-xs focus:outline-hidden focus:border-primary transition-colors bg-white font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                    >
                      {showCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                {/* New password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 block">New Password</label>
                  <div className="relative">
                    <input
                      type={showNew ? 'text' : 'password'}
                      placeholder="At least 8 characters"
                      {...passwordForm.register('newPassword', { required: true, minLength: 8 })}
                      className="w-full pr-10 p-3 rounded-xl border border-zinc-200 text-xs focus:outline-hidden focus:border-primary transition-colors bg-white font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                    >
                      {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                {/* Confirm new password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 block">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Repeat your new password"
                      {...passwordForm.register('confirmPassword', { required: true })}
                      className="w-full pr-10 p-3 rounded-xl border border-zinc-200 text-xs focus:outline-hidden focus:border-primary transition-colors bg-white font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                    >
                      {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <Button
                    type="submit"
                    disabled={changingPassword}
                    className="h-9 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    {changingPassword ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <CheckCircle size={13} />
                    )}
                    Update Password
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-7 w-7 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[9px] text-zinc-400 font-extrabold uppercase tracking-wider">{label}</p>
        <p className="text-xs text-slate-800 font-semibold mt-0.5">{value}</p>
      </div>
    </div>
  );
}
