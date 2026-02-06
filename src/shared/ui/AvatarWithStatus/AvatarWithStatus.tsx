"use client";
import React from "react";

export type UserAvatarVariant =
  | "avatarOnly"
  | "avatarWithStatusRight";

export type AvatarProps = {
  avatar_webp_url?: string;
  avatar_url?: string;
  avatar_webp?: string;
  avatar?: string;
  alt?: string;
};

type StatusProps = {
  is_online?: boolean;
  was_online_at?: number | undefined; 
};

type UserAvatarProps = {
  avatar: AvatarProps;
  status?: StatusProps;
  size?: number;
  variant?: UserAvatarVariant;
  showStatus?: boolean;
  hideAvatar?: boolean;
  isConnecting?: boolean;
  statusTextClassName?: string;
};

function pickAvatarUrl(avatar: AvatarProps): string {
  return (
    avatar.avatar_webp_url ||
    avatar.avatar_url ||
    avatar.avatar_webp ||
    avatar.avatar ||
    ""
  );
}


function formatLastSeen(timestamp: number | undefined): string {
  if (!timestamp) return "недавно";

  const date = new Date(timestamp * 1000);
  const now = Date.now();
  
  
  const diffMs = Math.abs(now - date.getTime());
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return "был(а) только что";
  if (diffMinutes < 60) return `был(а) ${diffMinutes} мин назад`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `был(а) в ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "был(а) вчера";
  if (diffDays < 7) return `был(а) ${diffDays} дн назад`;

  return `был(а) ${date.toLocaleDateString()}`;
}

function getStatusText(status: StatusProps | undefined, isConnecting?: boolean): string {
  if (isConnecting) return "соединение...";
  if (!status) return "";
  // Строгая проверка на онлайн
  if (status.is_online === true) return "в сети";
  return formatLastSeen(status.was_online_at);
}

export function UserAvatar({
  avatar,
  status,
  size = 10,
  variant = "avatarOnly", 
  showStatus = true,
  hideAvatar = false,
  isConnecting = false,
  statusTextClassName,
}: UserAvatarProps) {
  const src = pickAvatarUrl(avatar);
  const px = size * 4;
  const dimension = `${px}px`;

  const statusText = getStatusText(status, isConnecting);
  // Статус показывается, если это не вариант "только аватар"
  const shouldShowStatus = showStatus && variant !== "avatarOnly" && statusText;

  const avatarElement = hideAvatar ? null : (
    <div
      className="overflow-hidden rounded-full bg-gray"
      style={{ width: dimension, height: dimension }}
    >
      {src ? (
        <img
          src={src}
          alt={avatar.alt || ""}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-main">
          <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.6667 2.83333C13.2708 2.83333 14.5833 4.10833 14.5833 5.66667C14.5833 7.225 13.2708 8.5 11.6667 8.5C10.0625 8.5 8.75 7.225 8.75 5.66667C8.75 4.10833 10.0625 2.83333 11.6667 2.83333ZM11.6667 15.5833C15.6042 15.5833 20.125 17.4108 20.4167 18.4167V19.8333H2.91667V18.4308C3.20833 17.4108 7.72917 15.5833 11.6667 15.5833ZM11.6667 0C8.44375 0 5.83333 2.53583 5.83333 5.66667C5.83333 8.7975 8.44375 11.3333 11.6667 11.3333C14.8896 11.3333 17.5 8.7975 17.5 5.66667C17.5 2.53583 14.8896 0 11.6667 0ZM11.6667 12.75C7.77292 12.75 0 14.6483 0 18.4167V22.6667H23.3333V18.4167C23.3333 14.6483 15.5604 12.75 11.6667 12.75Z" fill="#7769E1"/>
          </svg>
        </div>
      )}
    </div>
  );

  const statusElement =
    shouldShowStatus ? (
      <span
        className={
          statusTextClassName ||
          (isConnecting
            ? "text-sm text-gray"
            : status?.is_online
              ? "text-sm text-primary" 
              : "text-sm text-gray")
        }
      >
        {statusText}
      </span>
    ) : null;

  if (variant === "avatarWithStatusRight") {
    if (hideAvatar) {
      return <div className="inline-flex">{statusElement}</div>;
    }
    return (
      <div className="flex items-center gap-3">
        {avatarElement}
        {statusElement}
      </div>
    );
  }
  
  return <div className="inline-flex">{avatarElement}</div>;
}