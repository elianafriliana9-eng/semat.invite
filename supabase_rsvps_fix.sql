-- 1. Pastikan kolom is_checked_in ada di tabel rsvps
ALTER TABLE rsvps ADD COLUMN IF NOT EXISTS is_checked_in BOOLEAN DEFAULT false;

-- 2. Aktifkan RLS di tabel rsvps (jika belum)
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- 3. Hapus kebijakan lama jika ada untuk menghindari duplikasi
DROP POLICY IF EXISTS "Users can view RSVPs for their own invitations" ON rsvps;
DROP POLICY IF EXISTS "Users can update RSVPs for their own invitations" ON rsvps;
DROP POLICY IF EXISTS "Users can delete RSVPs for their own invitations" ON rsvps;
DROP POLICY IF EXISTS "Public can insert RSVPs" ON rsvps;

-- 4. Kebijakan: Izinkan pemilik undangan untuk MELIHAT RSVP (SELECT)
CREATE POLICY "Users can view RSVPs for their own invitations"
ON rsvps FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM invitations
    WHERE invitations.id = rsvps.invitation_id
    AND invitations.user_id = auth.uid()
  )
);

-- 5. Kebijakan: Izinkan pemilik undangan untuk MENGUBAH RSVP (UPDATE)
CREATE POLICY "Users can update RSVPs for their own invitations"
ON rsvps FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM invitations
    WHERE invitations.id = rsvps.invitation_id
    AND invitations.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM invitations
    WHERE invitations.id = rsvps.invitation_id
    AND invitations.user_id = auth.uid()
  )
);

-- 6. Kebijakan: Izinkan pemilik undangan untuk MENGHAPUS RSVP (DELETE)
CREATE POLICY "Users can delete RSVPs for their own invitations"
ON rsvps FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM invitations
    WHERE invitations.id = rsvps.invitation_id
    AND invitations.user_id = auth.uid()
  )
);

-- 7. Kebijakan: Izinkan publik untuk mengirim RSVP (INSERT)
-- Ini diperlukan agar tamu bisa mendaftar lewat halaman undangan
CREATE POLICY "Public can insert RSVPs"
ON rsvps FOR INSERT
WITH CHECK (true);
