"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface GuestBookProps {
  invitationId?: string;
}

interface Message {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export function GuestBook({ invitationId }: GuestBookProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!invitationId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('rsvps')
          .select('id, name, message, created_at')
          .eq('invitation_id', invitationId)
          .not('message', 'is', null)
          .neq('message', '')
          .order('created_at', { ascending: false });

        if (!error && data) {
          setMessages(data);
        }
      } catch (err) {
        console.error("Error fetching guest book:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Setup realtime subscription
    const channel = supabase
      .channel(`guestbook-${invitationId}`)
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'rsvps', 
          filter: `invitation_id=eq.${invitationId}` 
        },
        (payload) => {
          if (payload.new.message) {
            setMessages((prev) => [payload.new as Message, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [invitationId]);

  if (loading) return (
    <div className="flex justify-center py-10">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  
  if (messages.length === 0) return (
    <div className="text-center py-10 bg-white/50 rounded-2xl border border-dashed border-[#A89A82]/20">
      <p className="font-sans text-sm italic text-gray-400">Belum ada ucapan. Jadilah yang pertama!</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#A89A82]/20">
      {messages.map((item, idx) => (
        <motion.div 
          key={item.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: Math.min(idx * 0.05, 0.5) }}
          className="bg-white p-5 rounded-2xl shadow-sm border border-[#A89A82]/10 space-y-2 relative group"
        >
          <div className="flex justify-between items-start">
            <h4 className="font-sans font-bold text-[#2D423F] text-xs uppercase tracking-wider">{item.name}</h4>
            <span className="text-[9px] text-gray-400 font-sans">
              {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
            </span>
          </div>
          <p className="font-sans text-sm italic text-[#243532]/70 leading-relaxed">
            "{item.message}"
          </p>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-10 transition-opacity">
            <svg className="w-8 h-8 text-[#A89A82]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21M14.017 21H10.017V18C10.017 14.6863 12.7033 12 16.017 12H19.017C22.3307 12 25.017 14.6863 25.017 18V21M3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C9.12157 16 10.017 16.8954 10.017 18V21M3.017 21H-0.983V18C-0.983 14.6863 1.70327 12 5.017 12H8.017C11.3307 12 14.017 14.6863 14.017 18V21" />
            </svg>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
