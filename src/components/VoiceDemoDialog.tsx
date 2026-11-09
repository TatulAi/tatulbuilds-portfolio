import { ConversationProvider, useConversation } from "@elevenlabs/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import type { Lang } from "../i18n/translations";

const TIME_ZONE = "Europe/Bratislava";
const POLL_MS = 4000;
const MAX_CALL_MS = 5 * 60 * 1000;
const REJECTED_CALL_MS = 3000;
const DAYS_SHOWN = 7;
const DEFAULT_OPEN_HOUR = 9;
const DEFAULT_CLOSE_HOUR = 18;
const HOUR_HEIGHT_REM = 2.5;

interface Booking {
  start: string;
  end: string;
}

interface ZonedTime {
  dayKey: string;
  hours: number;
}

const zonedParts = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function toZoned(date: Date): ZonedTime {
  const parts = Object.fromEntries(zonedParts.formatToParts(date).map((p) => [p.type, p.value]));
  return {
    dayKey: `${parts.year}-${parts.month}-${parts.day}`,
    hours: Number(parts.hour) + Number(parts.minute) / 60,
  };
}

function bookingKey(booking: Booking) {
  return `${booking.start}|${booking.end}`;
}

// Noon keeps each step on the right calendar day across daylight-saving changes.
function nextDays(): Date[] {
  const { dayKey } = toZoned(new Date());
  const noon = new Date(`${dayKey}T12:00:00Z`);
  return Array.from({ length: DAYS_SHOWN }, (_, i) => new Date(noon.getTime() + i * 86_400_000));
}

const locales: Record<Lang, string> = { en: "en-GB", sk: "sk-SK", am: "hy-AM" };

function useBookings(feedUrl: string, polling: boolean) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [failed, setFailed] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch(feedUrl, { cache: "no-store" });
      if (!response.ok) throw new Error(String(response.status));
      const data = (await response.json()) as { bookings: Booking[] };
      setBookings(data.bookings);
      setFailed(false);
      return data.bookings;
    } catch {
      setFailed(true);
      return null;
    }
  }, [feedUrl]);

  // Runs on open and on every change of `polling`, so the call's end triggers a last fetch.
  useEffect(() => {
    void refresh();
    if (!polling) return;
    const timer = window.setInterval(() => void refresh(), POLL_MS);
    return () => window.clearInterval(timer);
  }, [polling, refresh]);

  return { bookings, failed, refresh };
}

function WeekCalendar({ bookings, newKeys }: { bookings: Booking[]; newKeys: Set<string> }) {
  const { lang } = useLanguage();
  const locale = locales[lang];
  const days = nextDays();
  const positioned = bookings.map((booking) => {
    const start = toZoned(new Date(booking.start));
    const end = toZoned(new Date(booking.end));
    return { booking, start, endHours: end.dayKey === start.dayKey ? end.hours : 24 };
  });

  const openHour = Math.min(DEFAULT_OPEN_HOUR, ...positioned.map((p) => Math.floor(p.start.hours)));
  const closeHour = Math.max(DEFAULT_CLOSE_HOUR, ...positioned.map((p) => Math.ceil(p.endHours)));
  const hours = Array.from({ length: closeHour - openHour }, (_, i) => openHour + i);
  const timeFormat = new Intl.DateTimeFormat(locale, {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const weekdayFormat = new Intl.DateTimeFormat(locale, { timeZone: TIME_ZONE, weekday: "short" });
  const dayFormat = new Intl.DateTimeFormat(locale, { timeZone: TIME_ZONE, day: "numeric" });

  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[34rem] grid-cols-[2.75rem_repeat(7,minmax(0,1fr))]">
        <div />
        {days.map((day) => (
          <div key={day.getTime()} className="border-b border-border pb-1 text-center text-sm text-text-secondary">
            {weekdayFormat.format(day)} <span className="text-text">{dayFormat.format(day)}</span>
          </div>
        ))}

        <div className="relative">
          {hours.map((hour) => (
            <div key={hour} className="pr-1.5 text-right text-xs text-text-secondary" style={{ height: `${HOUR_HEIGHT_REM}rem` }}>
              {String(hour).padStart(2, "0")}:00
            </div>
          ))}
        </div>

        {days.map((day) => {
          const dayKey = toZoned(day).dayKey;
          return (
            <div key={dayKey} className="relative border-l border-border">
              {hours.map((hour) => (
                <div key={hour} className="border-b border-border" style={{ height: `${HOUR_HEIGHT_REM}rem` }} />
              ))}
              {positioned
                .filter((p) => p.start.dayKey === dayKey)
                .map(({ booking, start, endHours }) => {
                  const isNew = newKeys.has(bookingKey(booking));
                  return (
                    <div
                      key={bookingKey(booking)}
                      className={`absolute inset-x-0.5 overflow-hidden rounded px-1 text-xs ${
                        isNew ? "bg-cta-bg font-medium text-cta-text" : "bg-accent/30 text-text"
                      }`}
                      style={{
                        top: `${(start.hours - openHour) * HOUR_HEIGHT_REM}rem`,
                        height: `${(endHours - start.hours) * HOUR_HEIGHT_REM}rem`,
                      }}
                    >
                      {timeFormat.format(new Date(booking.start))}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface VoiceDemoPanelProps {
  agentId: string;
  calendarUrl: string;
}

function VoiceDemoPanels({ agentId, calendarUrl }: VoiceDemoPanelProps) {
  const { t, lang } = useLanguage();
  const copy = t.projects.demo;
  const [callFailed, setCallFailed] = useState(false);
  const [newKeys, setNewKeys] = useState<Set<string>>(new Set());
  const baseline = useRef<Set<string> | null>(null);
  const connectedAt = useRef(0);
  const conversation = useConversation({
    onError: () => setCallFailed(true),
    onConnect: () => {
      connectedAt.current = Date.now();
    },
    // An agent hang-up right after connecting means the call was rejected, e.g. by the host allowlist.
    onDisconnect: (details) => {
      const rejected = details.reason === "agent" && Date.now() - connectedAt.current < REJECTED_CALL_MS;
      if (details.reason === "error" || rejected) setCallFailed(true);
    },
  });
  const { status, isSpeaking, startSession, endSession } = conversation;
  const connected = status === "connected";
  const { bookings, failed, refresh } = useBookings(calendarUrl, connected);

  // Anything missing from the snapshot taken at call start was booked during this call.
  useEffect(() => {
    const before = baseline.current;
    if (before) setNewKeys(new Set(bookings.map(bookingKey).filter((key) => !before.has(key))));
  }, [bookings]);

  useEffect(() => {
    if (!connected) return;
    const timer = window.setTimeout(() => endSession(), MAX_CALL_MS);
    return () => window.clearTimeout(timer);
  }, [connected, endSession]);

  const endSessionRef = useRef(endSession);
  endSessionRef.current = endSession;
  useEffect(() => () => endSessionRef.current(), []);

  async function startCall() {
    setCallFailed(false);
    const current = await refresh();
    baseline.current = new Set((current ?? bookings).map(bookingKey));
    setNewKeys(new Set());
    try {
      // Asked up front because a denied microphone is the most likely failure; the SDK opens its own stream.
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      startSession({ agentId, connectionType: "websocket" });
    } catch {
      setCallFailed(true);
    }
  }

  const statusText =
    status === "connecting"
      ? copy.connecting
      : connected
        ? isSpeaking
          ? copy.speaking
          : copy.listening
        : copy.idle;
  const newBooking = bookings.find((booking) => newKeys.has(bookingKey(booking)));
  const announcement = newBooking
    ? `${copy.newBooking}: ${new Intl.DateTimeFormat(locales[lang], {
        timeZone: TIME_ZONE,
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).format(new Date(newBooking.start))}`
    : "";

  return (
    <div className="grid gap-6 md:grid-cols-[14rem_minmax(0,1fr)]">
      <div className="flex flex-col items-start">
        <p className="text-base text-text-secondary" aria-live="polite">
          {statusText}
        </p>
        <button
          type="button"
          onClick={connected ? () => endSession() : () => void startCall()}
          disabled={status === "connecting"}
          className="mt-4 cursor-pointer rounded-full bg-cta-bg px-7 py-3 text-base font-medium text-cta-text transition-colors hover:bg-cta-bg-hover hover:text-cta-text-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {connected ? copy.end : copy.start}
        </button>
        <p className="mt-4 text-sm text-text-secondary">{t.projects.demoHint}</p>
        {callFailed && (
          <p role="alert" className="mt-3 text-sm text-warm">
            {copy.callError}
          </p>
        )}
      </div>

      <div className="min-w-0">
        <h3 className="mb-3 text-base font-medium">{copy.calendarTitle}</h3>
        <WeekCalendar bookings={bookings} newKeys={newKeys} />
        {failed && <p className="mt-2 text-sm text-warm">{copy.calendarError}</p>}
        <p className="sr-only" aria-live="polite">
          {announcement}
        </p>
      </div>
    </div>
  );
}

interface VoiceDemoDialogProps extends VoiceDemoPanelProps {
  title: string;
  onClose: () => void;
}

export default function VoiceDemoDialog({ title, onClose, agentId, calendarUrl }: VoiceDemoDialogProps) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="voice-demo-title"
      className="m-auto w-[calc(100%-2rem)] max-w-4xl rounded-lg border border-border bg-surface p-6 text-text backdrop:bg-black/60"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <h2 id="voice-demo-title" className="text-lg font-medium">
          {title}
        </h2>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="cursor-pointer text-base text-accent hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {t.projects.demo.close}
        </button>
      </div>
      <ConversationProvider>
        <VoiceDemoPanels agentId={agentId} calendarUrl={calendarUrl} />
      </ConversationProvider>
    </dialog>
  );
}
